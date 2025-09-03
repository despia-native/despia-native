// index.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define([], factory);
    } else if (typeof module === 'object' && module.exports) {
      module.exports = factory();
    } else {
      root.despia = factory();
    }
  }(typeof self !== 'undefined' ? self : this, function () {
    'use strict';
  
    // Command queue for sequential execution
    const commandQueue = [];
    let processing = false;
  
    // Process command queue with 1ms delay between commands
    function processQueue() {
      if (processing || commandQueue.length === 0) return;
      
      processing = true;
      const { command } = commandQueue.shift();
      
      try {
        // Use the setter pattern: window.despia = command
        window.despia = command;
      } catch (e) {
        console.error('Despia command failed:', e);
      }
      
      setTimeout(() => {
        processing = false;
        processQueue();
      }, 1);
    }
  
    // Add command to queue
    function queueCommand(command) {
      if (typeof window !== 'undefined') {
        commandQueue.push({ command });
        processQueue();
      }
    }
  
    // Simple variable observer with 5-second timeout
    function observeDespiaVariable(variableName, callback, timeout = 5000) {
        const startTime = Date.now();
        
        function checkVariable() {
            if (window[variableName] !== undefined) {
                callback(window[variableName]);
            } else if (Date.now() - startTime < timeout) {
                setTimeout(checkVariable, 100);
            } else {
                console.error(`Despia timeout: ${variableName} was not set within ${timeout} ms`);
            }
        }
        
        checkVariable();
    }

    // VariableTracker class for complex multi-variable observation
    class VariableTracker {
        constructor(variables, onReady) {
            this.variables = variables;
            this.onReady = onReady;
            this.triggered = false;
            this.processing = false;
            
            // Create tracker element
            this.tracker = document.createElement('div');
            this.tracker.style.display = 'none';
            document.body.appendChild(this.tracker);
            
            // Setup observer with debounce
            let timeout;
            this.observer = new MutationObserver(() => {
                clearTimeout(timeout);
                timeout = setTimeout(() => this.check(), 100);
            });
            
            // Start observing and checking
            this.observer.observe(this.tracker, { attributes: true });
            this.check();
            this.interval = setInterval(() => this.check(), 1000);
        }

        check() {
            if (this.processing || this.triggered) return;
            this.processing = true;

            try {
                const values = {};
                const allSet = this.variables.every(name => {
                    const val = window[name];
                    // Check for undefined, "n/a" string, or null values
                    if (val === undefined || val === "n/a" || val === null) return false;
                    values[name] = val;
                    return true;
                });

                if (allSet && !this.triggered) {
                    this.triggered = true;
                    this.cleanup();
                    this.onReady(values);
                }
            } catch (err) {
                console.error("Error during check:", err);
            }
            
            this.processing = false;
        }

        cleanup() {
            this.observer.disconnect();
            clearInterval(this.interval);
            this.tracker.remove();
        }
    }

    // Observe variables - simple for single variable, tracker for multiple
    function observeVariables(variables, timeout) {
        if (!variables || variables.length === 0) {
            return Promise.resolve({});
        }

        if (variables.length === 1) {
            // Simple single variable observation with 5-second timeout
            return new Promise((resolve) => {
                observeDespiaVariable(variables[0], (value) => {
                    resolve({ [variables[0]]: value });
                }, 5000);
            });
        } else {
            // Multiple variables - use VariableTracker (no timeout, expires after 5 minutes)
            return new Promise((resolve) => {
                const tracker = new VariableTracker(variables, resolve);
                // Auto-cleanup after 5 minutes if not triggered
                setTimeout(() => {
                    if (!tracker.triggered) {
                        tracker.cleanup();
                        resolve({});
                    }
                }, 300000); // 5 minutes
            });
        }
    }
  
    // Main despia function
    function despiaFunction(command, watch = []) {
      // Queue command execution
      queueCommand(command);
      
      // No variables to watch
      if (!watch || watch.length === 0) {
        return Promise.resolve();
      }
      
      // Watch for variables (timeout handled internally)
      return observeVariables(watch);
    }
  
    // Create proxy for window access
    const despia = new Proxy(despiaFunction, {
      get(target, prop) {
        if (prop in target || prop === 'then' || typeof prop === 'symbol') {
          return target[prop];
        }
        
        if (typeof window !== 'undefined' && prop in window) {
          return window[prop];
        }
        
        return undefined;
      },
      
      apply(target, thisArg, args) {
        return target(...args);
      }
    });
  
    return despia;
  }));
import {
  __commonJS
} from "./chunk-HKJ2B2AA.js";

// node_modules/flatpickr/dist/plugins/monthSelect/index.js
var require_monthSelect = __commonJS({
  "node_modules/flatpickr/dist/plugins/monthSelect/index.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.monthSelectPlugin = factory());
    })(exports, function() {
      "use strict";
      var __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var monthToStr = function(monthNumber, shorthand, locale) {
        return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
      };
      function clearNode(node) {
        while (node.firstChild)
          node.removeChild(node.firstChild);
      }
      function getEventTarget(event) {
        try {
          if (typeof event.composedPath === "function") {
            var path = event.composedPath();
            return path[0];
          }
          return event.target;
        } catch (error) {
          return event.target;
        }
      }
      var defaultConfig = {
        shorthand: false,
        dateFormat: "F Y",
        altFormat: "F Y",
        theme: "light"
      };
      function monthSelectPlugin(pluginConfig) {
        var config = __assign(__assign({}, defaultConfig), pluginConfig);
        return function(fp) {
          fp.config.dateFormat = config.dateFormat;
          fp.config.altFormat = config.altFormat;
          var self2 = { monthsContainer: null };
          function clearUnnecessaryDOMElements() {
            if (!fp.rContainer)
              return;
            clearNode(fp.rContainer);
            for (var index = 0; index < fp.monthElements.length; index++) {
              var element = fp.monthElements[index];
              if (!element.parentNode)
                continue;
              element.parentNode.removeChild(element);
            }
          }
          function build() {
            if (!fp.rContainer)
              return;
            self2.monthsContainer = fp._createElement("div", "flatpickr-monthSelect-months");
            self2.monthsContainer.tabIndex = -1;
            buildMonths();
            fp.rContainer.appendChild(self2.monthsContainer);
            fp.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + config.theme);
          }
          function buildMonths() {
            if (!self2.monthsContainer)
              return;
            clearNode(self2.monthsContainer);
            var frag = document.createDocumentFragment();
            for (var i = 0; i < 12; i++) {
              var month = fp.createDay("flatpickr-monthSelect-month", new Date(fp.currentYear, i), 0, i);
              if (month.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && month.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear())
                month.classList.add("today");
              month.textContent = monthToStr(i, config.shorthand, fp.l10n);
              month.addEventListener("click", selectMonth);
              frag.appendChild(month);
            }
            self2.monthsContainer.appendChild(frag);
            if (fp.config.minDate && fp.currentYear === fp.config.minDate.getFullYear())
              fp.prevMonthNav.classList.add("flatpickr-disabled");
            else
              fp.prevMonthNav.classList.remove("flatpickr-disabled");
            if (fp.config.maxDate && fp.currentYear === fp.config.maxDate.getFullYear())
              fp.nextMonthNav.classList.add("flatpickr-disabled");
            else
              fp.nextMonthNav.classList.remove("flatpickr-disabled");
          }
          function bindEvents() {
            fp._bind(fp.prevMonthNav, "click", function(e) {
              e.preventDefault();
              e.stopPropagation();
              fp.changeYear(fp.currentYear - 1);
              selectYear();
              buildMonths();
            });
            fp._bind(fp.nextMonthNav, "click", function(e) {
              e.preventDefault();
              e.stopPropagation();
              fp.changeYear(fp.currentYear + 1);
              selectYear();
              buildMonths();
            });
            fp._bind(self2.monthsContainer, "mouseover", function(e) {
              if (fp.config.mode === "range")
                fp.onMouseOver(getEventTarget(e), "flatpickr-monthSelect-month");
            });
          }
          function setCurrentlySelected() {
            if (!fp.rContainer)
              return;
            if (!fp.selectedDates.length)
              return;
            var currentlySelected = fp.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected");
            for (var index = 0; index < currentlySelected.length; index++) {
              currentlySelected[index].classList.remove("selected");
            }
            var targetMonth = fp.selectedDates[0].getMonth();
            var month = fp.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (targetMonth + 1) + ")");
            if (month) {
              month.classList.add("selected");
            }
          }
          function selectYear() {
            var selectedDate = fp.selectedDates[0];
            if (selectedDate) {
              selectedDate = new Date(selectedDate);
              selectedDate.setFullYear(fp.currentYear);
              if (fp.config.minDate && selectedDate < fp.config.minDate) {
                selectedDate = fp.config.minDate;
              }
              if (fp.config.maxDate && selectedDate > fp.config.maxDate) {
                selectedDate = fp.config.maxDate;
              }
              fp.currentYear = selectedDate.getFullYear();
            }
            fp.currentYearElement.value = String(fp.currentYear);
            if (fp.rContainer) {
              var months = fp.rContainer.querySelectorAll(".flatpickr-monthSelect-month");
              months.forEach(function(month) {
                month.dateObj.setFullYear(fp.currentYear);
                if (fp.config.minDate && month.dateObj < fp.config.minDate || fp.config.maxDate && month.dateObj > fp.config.maxDate) {
                  month.classList.add("flatpickr-disabled");
                } else {
                  month.classList.remove("flatpickr-disabled");
                }
              });
            }
            setCurrentlySelected();
          }
          function selectMonth(e) {
            e.preventDefault();
            e.stopPropagation();
            var eventTarget = getEventTarget(e);
            if (!(eventTarget instanceof Element))
              return;
            if (eventTarget.classList.contains("flatpickr-disabled"))
              return;
            if (eventTarget.classList.contains("notAllowed"))
              return;
            setMonth(eventTarget.dateObj);
            if (fp.config.closeOnSelect) {
              var single = fp.config.mode === "single";
              var range = fp.config.mode === "range" && fp.selectedDates.length === 2;
              if (single || range)
                fp.close();
            }
          }
          function setMonth(date) {
            var selectedDate = new Date(fp.currentYear, date.getMonth(), date.getDate());
            var selectedDates = [];
            switch (fp.config.mode) {
              case "single":
                selectedDates = [selectedDate];
                break;
              case "multiple":
                selectedDates.push(selectedDate);
                break;
              case "range":
                if (fp.selectedDates.length === 2) {
                  selectedDates = [selectedDate];
                } else {
                  selectedDates = fp.selectedDates.concat([selectedDate]);
                  selectedDates.sort(function(a, b) {
                    return a.getTime() - b.getTime();
                  });
                }
                break;
            }
            fp.setDate(selectedDates, true);
            setCurrentlySelected();
          }
          var shifts = {
            37: -1,
            39: 1,
            40: 3,
            38: -3
          };
          function onKeyDown(_, __, ___, e) {
            var shouldMove = shifts[e.keyCode] !== void 0;
            if (!shouldMove && e.keyCode !== 13) {
              return;
            }
            if (!fp.rContainer || !self2.monthsContainer)
              return;
            var currentlySelected = fp.rContainer.querySelector(".flatpickr-monthSelect-month.selected");
            var index = Array.prototype.indexOf.call(self2.monthsContainer.children, document.activeElement);
            if (index === -1) {
              var target = currentlySelected || self2.monthsContainer.firstElementChild;
              target.focus();
              index = target.$i;
            }
            if (shouldMove) {
              self2.monthsContainer.children[(12 + index + shifts[e.keyCode]) % 12].focus();
            } else if (e.keyCode === 13 && self2.monthsContainer.contains(document.activeElement)) {
              setMonth(document.activeElement.dateObj);
            }
          }
          function closeHook() {
            var _a;
            if (((_a = fp.config) === null || _a === void 0 ? void 0 : _a.mode) === "range" && fp.selectedDates.length === 1)
              fp.clear(false);
            if (!fp.selectedDates.length)
              buildMonths();
          }
          function stubCurrentMonth() {
            config._stubbedCurrentMonth = fp._initialDate.getMonth();
            fp._initialDate.setMonth(config._stubbedCurrentMonth);
            fp.currentMonth = config._stubbedCurrentMonth;
          }
          function unstubCurrentMonth() {
            if (!config._stubbedCurrentMonth)
              return;
            fp._initialDate.setMonth(config._stubbedCurrentMonth);
            fp.currentMonth = config._stubbedCurrentMonth;
            delete config._stubbedCurrentMonth;
          }
          function destroyPluginInstance() {
            if (self2.monthsContainer !== null) {
              var months = self2.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month");
              for (var index = 0; index < months.length; index++) {
                months[index].removeEventListener("click", selectMonth);
              }
            }
          }
          return {
            onParseConfig: function() {
              fp.config.enableTime = false;
            },
            onValueUpdate: setCurrentlySelected,
            onKeyDown,
            onReady: [
              stubCurrentMonth,
              clearUnnecessaryDOMElements,
              build,
              bindEvents,
              setCurrentlySelected,
              function() {
                fp.config.onClose.push(closeHook);
                fp.loadedPlugins.push("monthSelect");
              }
            ],
            onDestroy: [
              unstubCurrentMonth,
              destroyPluginInstance,
              function() {
                fp.config.onClose = fp.config.onClose.filter(function(hook) {
                  return hook !== closeHook;
                });
              }
            ]
          };
        };
      }
      return monthSelectPlugin;
    });
  }
});
export default require_monthSelect();
/*! Bundled license information:

flatpickr/dist/plugins/monthSelect/index.js:
  (*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
  
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
  
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** *)
*/
//# sourceMappingURL=flatpickr_dist_plugins_monthSelect.js.map

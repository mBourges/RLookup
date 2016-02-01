(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("rx"), require("classnames"), require("immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "rx", "classnames", "immutable"], factory);
	else if(typeof exports === 'object')
		exports["ReactLookup"] = factory(require("react"), require("react-dom"), require("rx"), require("classnames"), require("immutable"));
	else
		root["ReactLookup"] = factory(root["react"], root["react-dom"], root["rx"], root["classnames"], root["immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _rx = __webpack_require__(3);

	var _rx2 = _interopRequireDefault(_rx);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _immutable = __webpack_require__(5);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _resultList = __webpack_require__(6);

	var _resultList2 = _interopRequireDefault(_resultList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Autocomplete = function (_React$Component) {
	    _inherits(Autocomplete, _React$Component);

	    function Autocomplete(props) {
	        _classCallCheck(this, Autocomplete);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Autocomplete).call(this, props));

	        _this.state = {
	            results: _immutable2.default.List(),
	            showResultList: false,
	            isSearching: false,
	            highlightedIndex: -1,
	            selected: _immutable2.default.Map({})
	        };
	        return _this;
	    }

	    _createClass(Autocomplete, [{
	        key: 'getSelectedItem',
	        value: function getSelectedItem() {
	            return this.state.selected;
	        }
	    }, {
	        key: 'ensureHighlightedVisible',
	        value: function ensureHighlightedVisible() {
	            if (!this.refs.list || this.state.highlightedIndex < 0) {
	                return;
	            }

	            if (this.refs.list && this.state.highlightedIndex < 0) {
	                _reactDom2.default.findDOMNode(this.refs.list).scrollTop = 0;
	            }

	            var $list = _reactDom2.default.findDOMNode(this.refs.list);
	            var $highlighted = $list.children[this.state.highlightedIndex];

	            $list.scrollTop = $highlighted.offsetTop - $list.offsetHeight / 2 + $highlighted.offsetHeight / 2;

	            return $list.scrollTop;
	        }
	    }, {
	        key: 'isSelectKey',
	        value: function isSelectKey(event) {
	            return event.keyCode === 13 || event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 9;
	        }
	    }, {
	        key: 'selectItem',
	        value: function selectItem(item) {
	            if (!item) {
	                item = _immutable2.default.Map({
	                    label: '',
	                    value: ''
	                });
	            }
	            this.setState({
	                isSearching: false,
	                showResultList: false,
	                results: _immutable2.default.List()
	            });

	            if (item) {
	                _reactDom2.default.findDOMNode(this.refs.AutocompleteInput).value = item.get('label');
	            }

	            this.setState({
	                selected: item,
	                results: _immutable2.default.List()
	            });
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            var inputElement = _reactDom2.default.findDOMNode(this.refs.AutocompleteInput);

	            var keyDownStream = _rx2.default.Observable.fromEvent(inputElement, 'keydown').filter(function (event) {
	                return _this2.isSelectKey(event);
	            }).map(function (event) {
	                var code = event.keyCode;
	                var highlightedIndex = _this2.state.highlightedIndex;

	                switch (code) {
	                    case 9:
	                        if (highlightedIndex >= 0) {
	                            _this2.selectItem(_this2.state.results.get(_this2.state.highlightedIndex));
	                        } else {
	                            _this2.selectItem(undefined);
	                        }
	                        break;
	                    case 13:
	                        if (highlightedIndex >= 0) {
	                            _this2.selectItem(_this2.state.results.get(_this2.state.highlightedIndex));
	                        } else {
	                            _this2.selectItem(undefined);
	                        }
	                        break;
	                    case 40:
	                        highlightedIndex < _this2.state.results.size - 1 && (highlightedIndex += 1);
	                        break;
	                    case 38:
	                        highlightedIndex > -1 && (highlightedIndex -= 1);
	                        break;
	                }

	                // this.setState({ highlightedIndex: highlightedIndex });
	                highlightedIndex > -1 && _this2.ensureHighlightedVisible();

	                if (code === 13 || code === 40 || code === 38) {
	                    event.preventDefault();
	                    event.stopPropagation();
	                }

	                return { highlightedIndex: highlightedIndex };
	            });

	            var resetInput = function resetInput() {
	                return {
	                    results: _immutable2.default.List(),
	                    showResultList: false,
	                    isSearching: false,
	                    highlightedIndex: -1
	                };
	            };

	            var blurStream = _rx2.default.Observable.fromEvent(inputElement, 'blur').map(resetInput);

	            var keyUpStream = null;

	            if (this.props.options) {
	                keyUpStream = _rx2.default.Observable.fromEvent(inputElement, 'keyup').filter(function (event) {
	                    return !_this2.isSelectKey(event);
	                }).filter(function (event) {
	                    return event.target.value.length > 1;
	                }).debounce(500).distinctUntilChanged().map(function (event) {

	                    var results = _immutable2.default.fromJS(_this2.props.options).filter(function (item) {
	                        var regexp = new RegExp("^" + event.target.value + ".*", "i");
	                        return regexp.test(item.get('value'));
	                    });
	                    return {
	                        showResultList: true,
	                        results: results,
	                        highlightedIndex: -1
	                    };
	                });
	            }

	            if (this.props.optionsLoader) {
	                keyUpStream = _rx2.default.Observable.fromEvent(inputElement, 'keyup').filter(function (event) {
	                    return !_this2.isSelectKey(event);
	                }).filter(function (event) {
	                    return event.target.value.length > 1;
	                }).debounce(500).distinctUntilChanged().map(function (event) {
	                    _this2.setState({
	                        isSearching: true,
	                        showResultList: true,
	                        highlightedIndex: -1,
	                        results: _immutable2.default.List()
	                    });

	                    return event.target.value;
	                }).flatMapLatest(function (value) {
	                    return _rx2.default.Observable.fromPromise(_this2.props.optionsLoader);
	                }).map(function (results) {
	                    console.log('Promise Results', results);
	                    return {
	                        results: _immutable2.default.fromJS(results),
	                        isSearching: false
	                    };
	                });
	            }

	            keyUpStream.merge(blurStream).merge(keyDownStream).subscribe(function (data) {
	                _this2.setState(data);
	                console.log(data);
	            }, function (error) {
	                console.log('Error:' + error);
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var displaySearchMessage = this.state.isSearching;
	            var displayNoResultMessage = !this.state.isSearching && this.state.results.size === 0;
	            var hasResults = this.state.results.size !== 0;

	            return _react2.default.createElement(
	                'div',
	                { className: 'autocomplete' },
	                _react2.default.createElement('input', { ref: 'AutocompleteInput', className: this.props.inputClassName, placeholder: this.props.placeholder, defaultValue: this.state.selected ? this.state.selected.get('label') : '' }),
	                this.state.showResultList && _react2.default.createElement(_resultList2.default, { ref: 'list',
	                    listClassName: this.props.listClassName,
	                    listItemClassName: this.props.listItemClassName,
	                    options: this.state.results,
	                    hasResults: hasResults,
	                    displaySearchMessage: displaySearchMessage,
	                    displayNoResultMessage: displayNoResultMessage,
	                    onMouseDown: this.selectItem.bind(this),
	                    highlightedIndex: this.state.highlightedIndex
	                })
	            );
	        }
	    }]);

	    return Autocomplete;
	}(_react2.default.Component);

	exports.default = Autocomplete;

	Autocomplete.propTypes = {
	    options: _react2.default.PropTypes.array,
	    optionsLoader: _react2.default.PropTypes.object
	};

	Autocomplete.defaultProps = {
	    placeholder: 'Search'
	};

	exports.default = Autocomplete;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _resultListItem = __webpack_require__(7);

	var _resultListItem2 = _interopRequireDefault(_resultListItem);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ResultList = function (_React$Component) {
	    _inherits(ResultList, _React$Component);

	    function ResultList() {
	        _classCallCheck(this, ResultList);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ResultList).apply(this, arguments));
	    }

	    _createClass(ResultList, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var listClassName = (0, _classnames2.default)(this.props.listClassName, "result-list");

	            return _react2.default.createElement(
	                'ul',
	                { className: listClassName },
	                this.props.hasResults && this.props.options.map(function (option, index) {
	                    return _react2.default.createElement(_resultListItem2.default, {
	                        listItemClassName: _this2.props.listItemClassName,
	                        key: index,
	                        onMouseDown: _this2.props.onMouseDown,
	                        option: option,
	                        highlightedIndex: _this2.props.highlightedIndex,
	                        index: index
	                    });
	                }),
	                this.props.displaySearchMessage && _react2.default.createElement(
	                    'li',
	                    null,
	                    this.props.searchMessage
	                ),
	                this.props.displayNoResultMessage && _react2.default.createElement(
	                    'li',
	                    null,
	                    this.props.noResultMessage
	                )
	            );
	        }
	    }]);

	    return ResultList;
	}(_react2.default.Component);

	ResultList.propTypes = {
	    options: _react2.default.PropTypes.object.isRequired,
	    hasResults: _react2.default.PropTypes.bool.isRequired,
	    displaySearchMessage: _react2.default.PropTypes.bool.isRequired,
	    displayNoResultMessage: _react2.default.PropTypes.bool.isRequired,
	    onMouseDown: _react2.default.PropTypes.func.isRequired,
	    highlightedIndex: _react2.default.PropTypes.number.isRequired
	};

	ResultList.defaultProps = {
	    seachMessage: 'Searching...',
	    noResultMeassga: 'No Results found.'
	};

	exports.default = ResultList;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ResultListItem = function ResultListItem(_ref) {
	    var onMouseDown = _ref.onMouseDown;
	    var option = _ref.option;
	    var highlightedIndex = _ref.highlightedIndex;
	    var index = _ref.index;

	    var handleClick = function handleClick() {
	        onMouseDown(option);
	    };

	    var isActive = function isActive() {
	        return highlightedIndex === index;
	    };

	    var styleClass = (0, _classnames2.default)({
	        active: isActive()
	    });

	    var listItemClassName = (0, _classnames2.default)(listItemClassName, "result-list");

	    return _react2.default.createElement(
	        'li',
	        { className: listItemClassName, onMouseDown: handleClick, className: styleClass },
	        option.get('label')
	    );
	};

	exports.default = ResultListItem;

/***/ }
/******/ ])
});
;
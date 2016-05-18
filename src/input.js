import React from 'react';

class Input extends React.Component {
    render() {
        const defaultInputValue = this.props.defaultValue ? this.props.defaultValue.get('label') : '';
        const defaultPlaceholder = this.props.placeholder || 'Search...';
        
        return (<input
            required={ this.props.required }
            className={ this.props.inputClassName }
            placeholder={ defaultPlaceholder }
            defaultValue={ defaultInputValue }
        />);
    }
}

Input.propTypes = {
    defaultValue: React.PropTypes.object,
    inputClassName: React.PropTypes.string,
    placeholder: React.PropTypes.string, 
    required: React.PropTypes.bool
};

export default Input;
import React, { Component } from 'react'
import css from '../styles/index.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import globalVars from '../libs/globalVariables'

class Header extends Component {
	render() {
		if (!globalVars.get('enableHeader')) {
			return null
		}
		return (
			<div
				className={`${css['box__header']} ${css['flex']} ${css[
					'center'
				]}`}
			>
				<div className={`${css['text-align--left']} ${css['flex1']}`}>
					<p className={`${css['box__header__title']}`}>
						Select Image
					</p>
				</div>
				<div className={`${css['text-align--right']} ${css['flex1']}`}>
					<a href="javascript:void(0)" onClick={this.props.onCancel}>
						<i className="fa fa-close"></i>
					</a>
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch)
}

export default connect(null, mapDispatchToProps)(Header)

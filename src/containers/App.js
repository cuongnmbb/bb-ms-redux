import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import css from '../styles/index.css'
import Header from '../components/Header'
import Content from '../components/Content'
import Footer from '../components/Footer'
import Toast from '../components/Toast'
import * as libs from '../libs/libs'

class App extends Component {
	componentDidMount() {
		document.addEventListener('dragover', (e) => e.preventDefault())
		document.addEventListener('drop', (e) => e.preventDefault())
	}

	componentWillMount() {
		const { config, fileType, enableFooter, enableHeader } = this.props
		const { folder, selected, type } = libs.getParamsFromURL()
		let path = selected? selected.substring(0, selected.lastIndexOf('/') + 1)
			: libs.getPathFromLocal()
		if (folder !== undefined && !path.includes(folder)) path = folder
		const initOptions = {
			config, fileType, enableFooter, enableHeader, type,
			root: libs.standardizedPath(folder, 'dir'),
			path: libs.standardizedPath(path, 'dir'),
			selected: libs.standardizedPath(selected, 'file')
		}

		this.props.init(initOptions)
		selected && libs.setPathToLocal(path)
	}

	render() {
		const { isSidebarHidden } = this.props
		return (
			<div className={`${css['wrapper']}`}>
				<div className={`${css['media-selector']}`}>
					<div
						className={`${css['box']} ${css[
							'relative'
						]} ${isSidebarHidden ? css['hide-tree-folder'] : ''}`}
					>
						<Header />
						<Content />
						<Footer />
						<Toast />
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		isSidebarHidden: state.generalReducer.isSidebarHidden
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

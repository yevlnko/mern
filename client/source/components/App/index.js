// Core
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { fromJS, List } from 'immutable';

import {withRouter} from 'react-router';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Routes from 'navigation';

import {itemsActions} from 'redux/items/actions';


const mapStateToProps = state => ({
	items: state.get('items'),
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...itemsActions,
		},
		dispatch,
	),
});

@hot(module)
@withRouter
@connect(
	mapStateToProps,
	mapDispatchToProps,
)
class App extends Component {
	
	static defaultProps = {
		name: 'name',
		items: List(),
	};
	
	handleClickGetItems = event => {
		event.preventDefault();
		
		const {actions} = this.props;
		actions.fetchItems();
	};
	
	handleClickCreateItem = event => {
		event.preventDefault();
		
		const {actions} = this.props;
		actions.createItem({
			name: "handleClickCreateItem"
		});
	};
	
	render() {
		
		const { items } = this.props;
		
		const itemsList = items.map((item) => {
			return (
				<ul key={item.get('_id')}>
					<li>{item.get('name')}</li>
					<li>{item.get('date')}</li>
				</ul>
			);
		});
		
		return (
			<>
				<header>
					<nav>
						<li>
							<Link to="/">/</Link>
						</li>
						<li>
							<Link to="/about">/about</Link>
						</li>
					</nav>
				</header>
				
				<main>
					
					<button onClick={this.handleClickGetItems}>
						GET ITEMS
					</button>
					
					<button onClick={this.handleClickCreateItem}>
						Create new ITEM
					</button>
					
					{ itemsList }
					
				</main>
				
				<Routes/>
			</>
		);
	}
}

export default App;

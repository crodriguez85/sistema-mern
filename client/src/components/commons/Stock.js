import React, { Component } from 'react'
import Tabs from '@babel/core/Tabs';
import Tab from '@babel/core/Tab';

class Stock extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state={
        activeTab: 0,
        data:[]
    }
    
    handleChange(event, activeTab){
        this.setState({activeTab}, this.loadData);
        this.loadData();
    }

    render(){
        const activeTab = this.state.activeTab;
        return (
            <div>
                <Tabs value={activeTab} onChange={this.handleChange}>
                    <Tab label="Categoria"></Tab>
                    <Tab label="Articulos"></Tab>
                </Tabs>
                {
                    activeTab == 0 && 
                    (
                        <div>
                            Pagina 1
                        </div>
                    )
                }
                {
                    activeTab == 1 && 
                    (
                        <div>
                            Pagina 2
                        </div>
                    )
                }

            </div>
        )
    }

    loadData
}

export default Stock;
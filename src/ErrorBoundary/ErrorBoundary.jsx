import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as Error} from '../img/error.svg';


const RenderStyles = ({children}) => {
    return(
        <div className='col col__center'>
        <div className="container col col__center">
        <div className=" col col__center mb-2">
                            <Error />
                        
                            {children}
                        <div className='mt-2'>
                            <a href={'/'} style={{textDecoration: 'none'}}>Go To Home Page</a>
                        </div> 
                        </div>
        </div>         
        </div>
    );
}

export default class ErrorBoundary extends Component{

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]).isRequired,
        render: PropTypes.func.isRequired
    };

    state ={
        hasError: false,
        error: null,
        errorInfo: null,
    }

    componentDidCatch(error, errorInfo){
        this.setState({
            hasError: true,
            error,
            errorInfo
        })
    }

    render(){
        if(this.state.hasError){
            return (
                <RenderStyles>
                    {this.props.render(this.props.error, this.props.errorInfo)}
                </RenderStyles>
            )
        }
        return this.props.children;
    }
}
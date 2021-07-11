import React from 'react'
import './homebody.css'
import { Bottom } from '../../Components/Bottom/Bottom';
import { TextCard } from './TextCard.js'
import { PicCard } from './PicCard.js'
import { useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
const HomeBody = () => {
    let user = useSelector((state)=>state.auth.user);
    let history = useHistory();
    if(user!=null)
    {
        history.push("/meet");
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <TextCard/>
                    <PicCard/>
            </div>
            </div>
            <div className="home">
            <div className="center my-5">
                <Bottom />
            </div>
            </div>
        </div>
    )
}
export default HomeBody;
import styles from '../styles/Loader.module.css'
import request from 'superagent';
import { Button, Spacer,  Navbar, Text, StyledLoading } from '@nextui-org/react';
import {useEffect, useState, useRef} from 'react';
import { useRouter} from 'next/router'
import Logger from '../lib/logger';
import appname from '../lib/appname';


const about = `Welcome to the Grow your Own Story app.  We are nearly there!  You just need to provide us with the name of the story you'd like to explore!`

function Loader() {

    const logger = useRef(null); 
    const router = useRouter();
    const [variants, setVariants] = useState([{icon:"story.png", label: `Listen to`, id:"silverquest"},{icon:"explore.png", label: `Explore`, id:"silverquest-explore"} ]);
    const [scriptName, setScriptName] = useState("");
    const [showLogId, setShowLogId] = useState(false);
    const [logId, setLogId]= useState();
    const [loading, setLoading] = useState(false);

    const log = (type, data)=>{
        if (!logId){
            const _logId = localStorage.getItem("loggerId");
            setLogId(_logId);
            logger.current.log(_logId, type, data)
        }else{
            logger.current.log(logId, type, data)
        }
    }

    useEffect(()=>{
       
        logger.current = new Logger(new Worker('worker.js'));
        try{
            const ua = navigator.userAgent;
            log("app init", JSON.stringify(ua));
        }catch(err){
            log("app init","");
        }
    },[]);

    const scriptChangeHandler = (event) => {
        setScriptName(event.target.value);
	};


    const routeTo = (id)=>{   
        log("variant chosen", id);
        setLoading(true);
        router.push(`/story/${id}`); 
    }


    const renderVariants = ()=>{
        const _renderLabel = (label, id)=>{
            return <span>{label} <span style={{fontWeight:800}}>{`Quest for Silver`}</span></span>
        }
        const items = variants.map(v=>{
            return <div key={v.id}> 
                    <Text  onClick={()=>routeTo(v.id)} css={{ color:"white", textAlign: "center", margin:8, fontSize:"1.2em"}}>{_renderLabel(v.label, v.id)}</Text>
                   
                    <div onClick={()=>routeTo(v.id)} className={styles.imagerow}>
                        <div className={styles.imagecontainer}>
                            <img  src={v.icon} height="150px"/>
                        </div>
                    </div>
              
               </div>
        })
        if (!loading && items.length > 0){
            return  <div className={styles.variantcontainer}> {items} </div>
        }
        
    }

    const fetchVariants  = (name)=>{
        request.get('/api/variants').query({id:name || ""}).then(async (res) => {
            const variants = res.body;
            setScriptName("");
            setVariants(variants);
        });
    }

    /*const renderLibrary = ()=>{
        
        return <>
                <div className={styles.imagerow}>
                    <div className={styles.imagecontainer}>
                        <img src="logo.svg" height="150px"/>
                    </div>
               </div>
              <Spacer/>
              <div className={styles.about}>{about}</div>
              <Spacer/>
       
               
                
                <div className={styles.uploadcontainer}>
			        <input value={scriptName} className={styles.textbox} type="text" name="scriptname" placeholder="story name" onChange={scriptChangeHandler} />
                    <Button auto  flat  style={{margin:10}}  onClick={fetchVariants}>find!</Button>
                </div>
                
           
            </>
    }*/

    const renderLogId = ()=>{
        return <div  className={styles.logbox}>
                    <div onClick={()=>{setShowLogId(false)}} className={styles.log}>{logId}</div>
                </div>
    }

    const renderLoading = ()=>{
        return <div className={styles.loadingcontainer}> 
            <div className={styles.progress}>fetching the story!</div>
           <div className={styles.imagerow}>
                    <div className={styles.imagecontainer}>
                        <img className={styles.spinning} src="logo.svg" height="150px"/>
                    </div>
               </div>
        </div>
    }

    const renderFetchStory = ()=>{
        return <div className={styles.container}> 
                {/*variants.length <= 0 && renderLibrary()*/}
                {renderVariants()}
                </div>
    }

    return (<div>
             <Navbar isBordered={false} variant="sticky">
                    <Navbar.Brand>
                   
                    <Text b color="inherit">
                        {appname()}
                    </Text>
                    </Navbar.Brand>
                    <Navbar.Content>
                        <Navbar.Item id="itemone">
                            <Button id="mybutton" auto  flat onPress={()=>setShowLogId(!showLogId)}>{!showLogId ? 'id' : 'hide'}</Button>
                        </Navbar.Item>
                    </Navbar.Content>
                </Navbar>   
                {showLogId && renderLogId()}
                {!loading && renderFetchStory()}
                {/*loading && renderLoading()*/}
            </div>
    )
}


   
               

export default Loader;

export function uniqueid(){
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    var length = 10;
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
   
   return str;
    
}

const _formatLine = (str)=>{
    const toks = str.split("]");
    return <span><strong>{toks[0].replace("[","")}</strong>{toks[1]}</span>
}
export  function format(text){
    let scene;
    const lines = [];
    const index = 0;

    if (text.indexOf("[") !== -1 && text.indexOf("]") != -1){
      text.split(/\s+/).forEach((token)=>{
          if (token.startsWith("[")){
            lines.push("")
          }
          lines[lines.length-1] = `${lines[lines.length-1]} ${token}`; 
      });
      
      return lines.map((l,i)=><div style={{marginTop: i == 0 ? 0 : 10}} key={i}>
        {_formatLine(l)}
      </div>); 
    }
    else{
      return text;
    }
  }




let showMsg = (msg,tag)=>{
    this.$dialog.toast({
        mes: msg,
        timeout: 1500,
        icon: tag
    });
}
let zw = {showMsg};
export default zw;
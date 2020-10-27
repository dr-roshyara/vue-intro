const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true
        }
    },
    methods: {
        updateCart(info) {
           
            if(info.add){
                this.cart.push(info.id);
            }else{
                var idx =this.cart.findIndex(item=>item==info.id);
                console.log("idx: "+idx);
                if(idx>=0){
                    this.cart.splice(idx, 1);
                }
            }
            console.log(this.cart);
        },
        removeFromCart(id){
            
        }
    }
})

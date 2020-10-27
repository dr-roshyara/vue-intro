app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
  /*html*/
  `<div>
   <h1 >{{product}} </h1>   
  <div class="product-display">
    
  <div class="product-container">
    
      <div class="product-image">
            <img :src="image">
    </div>
    <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock"> In stock</p>
        <p v-else> Out of stock</p> 
             <p>Shipping: {{ shipping }}</p>
        <ul>
            <li v-for="(detail, index) in details" :key="index"> {{detail}} </li>
        </ul>
          <div class="color-circle"
            v-for="(variant, idx) in variants" 
            :key="variant.id"
            @mouseover="updateVariant(idx)" 
            :style="{ backgroundColor: variant.color }"
          > </div>
          <button  class="button" 
               :class="{ disabledButton: !inStock }" 
                v-on:click="addToCart"
               >Add to Cart </button> 
         <button 
         class="button"
         :class ="{ disabledButton: !inStock }"
          v-on:click="removeFromCart"
        
         >
         Remove from Cart </button>
             <review-list v-if="reviews.length" :reviews="reviews">
             </review-list>
     

     </div>
       
    <review-form @review-submitted="addReview"></review-form>
    </div>

    </div>
   
    </div>`,
    data(){
        return {
            product: "Socks",
            brand: "Vue Mastery",
            details: ['50% cotton', '30% wool', '20% polyester'],
            selectedVariant: 1,
            variants: [
                {
                    id: 2234,
                    color: 'green',
                    image: './assets/images/socks_green.jpg',
                     quantity: 50 
                },
                {   id: 2235, 
                    color: 'blue', 
                    image: './assets/images/socks_blue.jpg', 
                    quantity: 1
                },
            
            ],
            reviews:[]
           
        }
    },
    methods:{
        addToCart(){
         var info ={
            add:true,
             id: this.variants[this.selectedVariant].id
         };  
            return this.$emit('add-to-cart',info);
        },
        removeFromCart(){
            var info = {
                add: false,
                id: this.variants[this.selectedVariant].id
            };
            return this.$emit('remove-from-cart', info);
        },
        updateVariant(idx){
            this.selectedVariant=idx;
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed:{
        title(){
            return this.brand+' '+this.product ;
        },
        image(){
            return  this.variants[this.selectedVariant].image; 
        },
        inStock(){
            return this.variants[this.selectedVariant].quantity;
        },
        shipping(){
             if(this.premium){
                 return 'free';
             }
             return 2.99;
        }
    }
});


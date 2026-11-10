<template>
  <v-container fluid class="px-6 px-md-10 pt-4 pb-10" style="max-width: 1350px;">

    <!-- BANNER -->
    <v-img src="/images/banner.png" width="100%" height="130" cover rounded="lg" class="mb-8"
      alt="MindCast Productivity Essentials" />

    <!-- HEADER -->
    <v-row align="center" justify="space-between" class="mb-6">
      <v-col cols="12" md="7">
        <h1 class="products-heading">Our Products.</h1>
        <p class="text-grey-lighten-1 mt-2">
          Explore productivity essentials, stationery, and lifestyle items.
        </p>
      </v-col>

      <v-col cols="12" md="5">
        <div class="search-cart-row">
          <v-btn icon color="primary" variant="outlined" size="large" class="cart-icon-button"
            aria-label="Open shopping cart" @click="cartDialog = true">
            <v-badge :content="cartCount" :model-value="cartCount > 0" color="red">
              <v-icon size="24">mdi-cart-outline</v-icon>
            </v-badge>
          </v-btn>

          <v-text-field v-model="search" placeholder="Search products..." prepend-inner-icon="mdi-magnify"
            variant="solo" density="comfortable" rounded="lg" hide-details bg-color="surface" color="primary"
            class="search-field" />
        </div>
      </v-col>
    </v-row>

    <!-- CATEGORIES -->
    <div class="d-flex flex-wrap ga-2 mb-7">
      <v-btn v-for="category in categories" :key="category"
        :color="selectedCategory === category ? 'primary' : 'surface'"
        :variant="selectedCategory === category ? 'flat' : 'outlined'" rounded="pill" size="small" :style="selectedCategory === category
          ? 'font-weight: 600;'
          : 'border-color: rgba(52,230,181,.45); color: #A8CFC1;'" @click="selectedCategory = category">
        {{ category }}
      </v-btn>
    </div>

    <!-- PRODUCT GRID -->
    <v-row>
      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <v-card color="surface" rounded="lg" height="100%"
          style="border: 1px solid rgba(52,230,181,.15); overflow: hidden;">
          <div style="position: relative;">
            <v-img :src="product.image" height="200" cover :alt="product.name" />

            <v-btn icon size="small" variant="flat" color="surface" style="position: absolute; top: 10px; right: 10px;"
              @click.stop="toggleFavorite(product.id)">
              <v-icon :color="favorites.includes(product.id) ? 'red' : 'white'">
                {{ favorites.includes(product.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
              </v-icon>
            </v-btn>
          </div>

          <v-card-text class="pa-3">
            <div class="text-caption text-primary mb-1">
              {{ product.category }}
            </div>

            <h3 class="text-subtitle-1 font-weight-bold">
              {{ product.name }}
            </h3>

            <p class="text-caption text-grey-lighten-1 mt-2" style="min-height: 38px;">
              {{ product.description }}
            </p>

            <div class="text-subtitle-1 font-weight-bold mt-2">
              ₱{{ product.price.toLocaleString('en-PH') }}
            </div>
          </v-card-text>

          <v-card-actions class="px-3 pb-3 pt-0 d-flex flex-column">
            <v-btn block color="primary" variant="outlined" rounded="lg" @click.stop="openProductDetails(product)">
              <v-icon start size="17">mdi-eye-outline</v-icon>
              View Details
            </v-btn>

            <v-btn block color="primary" variant="flat" rounded="lg" @click="addToCart(product)">
              <v-icon start size="17">mdi-cart-plus</v-icon>
              Add to Cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- NO PRODUCTS FOUND -->
      <v-col v-if="filteredProducts.length === 0" cols="12">
        <div class="text-center py-12">
          <v-icon size="55" color="grey">mdi-package-variant</v-icon>
          <h3 class="text-h6 mt-3">No products found</h3>
          <p class="text-grey">Try another search or category.</p>

          <v-btn color="primary" variant="text" @click="resetFilters">
            View All Products
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- PRODUCT DETAILS POPUP -->
    <div v-if="detailsDialog && selectedProduct" class="product-modal-overlay" @click.self="closeProductDetails">
      <div class="product-modal">
        <button type="button" class="modal-close" aria-label="Close product details" @click="closeProductDetails">
          <v-icon>mdi-close</v-icon>
        </button>

        <div class="modal-content">
          <div class="modal-image">
            <img :src="selectedProduct.image" :alt="selectedProduct.name" />
          </div>

          <div class="modal-details">
            <div class="text-primary text-caption font-weight-bold mb-2">
              {{ selectedProduct.category }}
            </div>

            <h2 class="modal-title">
              {{ selectedProduct.name }}
            </h2>

            <div class="rating-row">
              <v-icon color="amber" size="18">mdi-star</v-icon>
              <v-icon color="amber" size="18">mdi-star</v-icon>
              <v-icon color="amber" size="18">mdi-star</v-icon>
              <v-icon color="amber" size="18">mdi-star</v-icon>
              <v-icon color="amber" size="18">mdi-star-half-full</v-icon>
              <span>4.5 ({{ selectedProduct.reviews }} reviews)</span>
            </div>

            <div class="modal-price">
              ₱{{ selectedProduct.price.toLocaleString('en-PH') }}
            </div>

            <p class="modal-description">
              {{ selectedProduct.description }}
            </p>

            <div class="quantity-label">Quantity</div>

            <div class="quantity-control">
              <button type="button" :disabled="quantity <= 1" @click="decreaseQuantity">
                −
              </button>

              <span>{{ quantity }}</span>

              <button type="button" @click="increaseQuantity">
                +
              </button>
            </div>

            <div class="modal-total">
              Total:
              <strong>
                ₱{{ (selectedProduct.price * quantity).toLocaleString('en-PH') }}
              </strong>
            </div>

            <div class="modal-actions">
              <v-btn color="primary" variant="flat" rounded="lg" block @click="addSelectedProductToCart">
                <v-icon start>mdi-cart-plus</v-icon>
                Add to Cart
              </v-btn>

              <v-btn :color="favorites.includes(selectedProduct.id) ? 'red' : 'white'" variant="outlined" rounded="lg"
                block @click="toggleFavorite(selectedProduct.id)">
                <v-icon start>
                  {{ favorites.includes(selectedProduct.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
                </v-icon>
                {{ favorites.includes(selectedProduct.id) ? 'Remove Wishlist' : 'Add to Wishlist' }}
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SHOPPING CART POPUP -->
    <div v-if="cartDialog" class="product-modal-overlay" @click.self="cartDialog = false">
      <div class="cart-modal">
        <div class="cart-header">
          <div>
            <h2 class="cart-title">
              <v-icon color="primary" class="mr-2">mdi-cart-outline</v-icon>
              My Shopping Cart
            </h2>

            <p class="text-grey-lighten-1 text-caption mt-1">
              {{ cartCount }} item(s) in your cart
            </p>
          </div>

          <button type="button" class="modal-close" aria-label="Close cart" @click="cartDialog = false">
            <v-icon>mdi-close</v-icon>
          </button>
        </div>

        <!-- EMPTY CART -->
        <div v-if="cartItems.length === 0" class="empty-cart">
          <v-icon size="65" color="grey">mdi-cart-outline</v-icon>
          <h3 class="mt-3">Your cart is empty</h3>

          <p class="text-grey-lighten-1 mt-2">
            Add some products to get started!
          </p>

          <v-btn color="primary" class="mt-5" rounded="lg" @click="cartDialog = false">
            Continue Shopping
          </v-btn>
        </div>

        <!-- CART ITEMS -->
        <div v-else>
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" class="cart-item-image" />

            <div class="cart-item-info">
              <div class="text-caption text-primary">
                {{ item.category }}
              </div>

              <h3>{{ item.name }}</h3>

              <strong class="cart-item-price">
                ₱{{ item.price.toLocaleString('en-PH') }}
              </strong>

              <div class="cart-quantity">
                <button type="button" :disabled="item.quantity <= 1" @click="changeCartQuantity(item.id, -1)">
                  −
                </button>

                <span>{{ item.quantity }}</span>

                <button type="button" @click="changeCartQuantity(item.id, 1)">
                  +
                </button>
              </div>
            </div>

            <div class="cart-item-end">
              <strong>
                ₱{{ (item.price * item.quantity).toLocaleString('en-PH') }}
              </strong>

              <button type="button" class="remove-cart-item" aria-label="Remove item" @click="removeFromCart(item.id)">
                <v-icon size="20">mdi-delete-outline</v-icon>
              </button>
            </div>
          </div>

          <!-- CART SUMMARY -->
          <div class="cart-summary">
            <div class="d-flex justify-space-between align-center">
              <span>Subtotal</span>
              <strong>
                ₱{{ cartSubtotal.toLocaleString('en-PH') }}
              </strong>
            </div>

            <v-btn block color="primary" rounded="lg" class="mt-5" @click="openCheckout">
              <v-icon start>mdi-check-circle-outline</v-icon>
              Proceed to Checkout
            </v-btn>

            <v-btn block variant="text" color="white" class="mt-2" @click="cartDialog = false">
              Continue Shopping
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- CHECKOUT POPUP -->
    <div v-if="checkoutDialog" class="product-modal-overlay checkout-overlay" @click.self="closeCheckout">
      <div class="checkout-modal">

        <!-- CHECKOUT HEADER -->
        <div class="checkout-header">
          <h2 class="checkout-title">Checkout.</h2>

          <button type="button" class="modal-close" aria-label="Close checkout" @click="closeCheckout">
            <v-icon>mdi-close</v-icon>
          </button>
        </div>

        <v-form ref="checkoutForm" @submit.prevent="placeOrder">
          <div class="checkout-layout">

            <!-- SHIPPING INFORMATION -->
            <div class="shipping-section">
              <h3 class="checkout-section-title">
                Shipping Information
              </h3>

              <div class="checkout-fields">
                <v-text-field v-model="customer.fullName" label="Full Name *" variant="outlined" density="comfortable"
                  color="primary" :rules="[requiredRule]" hide-details="auto" />

                <v-text-field v-model="customer.phone" label="Phone Number *" variant="outlined" density="comfortable"
                  color="primary" :rules="[requiredRule, phoneRule]" hide-details="auto" />

                <v-text-field v-model="customer.email" label="Email Address *" type="email" variant="outlined"
                  density="comfortable" color="primary" :rules="[requiredRule, emailRule]" hide-details="auto"
                  class="field-full" />

                <v-textarea v-model="customer.address" label="Shipping Address *" variant="outlined"
                  density="comfortable" color="primary" rows="3" auto-grow :rules="[requiredRule]" hide-details="auto"
                  class="field-full" />
              </div>

              <!-- PAYMENT METHOD -->
              <h3 class="checkout-section-title payment-heading">
                Payment Method
              </h3>

              <div class="payment-options">
                <button type="button" class="payment-option"
                  :class="{ 'payment-selected': customer.paymentMethod === 'Cash on Delivery (COD)' }"
                  @click="customer.paymentMethod = 'Cash on Delivery (COD)'">
                  <v-icon color="primary">mdi-truck-delivery-outline</v-icon>
                  <span>Cash on Delivery (COD)</span>
                  <v-icon v-if="customer.paymentMethod === 'Cash on Delivery (COD)'" color="primary" class="ml-auto">
                    mdi-check-circle
                  </v-icon>
                </button>

                <button type="button" class="payment-option"
                  :class="{ 'payment-selected': customer.paymentMethod === 'Bank Transfer (Sample)' }"
                  @click="customer.paymentMethod = 'Bank Transfer (Sample)'">
                  <v-icon color="primary">mdi-credit-card-outline</v-icon>
                  <span>Bank Transfer (Sample)</span>
                  <v-icon v-if="customer.paymentMethod === 'Bank Transfer (Sample)'" color="primary" class="ml-auto">
                    mdi-check-circle
                  </v-icon>
                </button>
              </div>
            </div>

            <!-- ORDER SUMMARY -->
            <div class="checkout-summary">
              <h3 class="checkout-section-title">Order Summary</h3>

              <div v-for="item in cartItems" :key="item.id" class="summary-item">
                <img :src="item.image" :alt="item.name" class="summary-image" />

                <div class="summary-product">
                  <strong>{{ item.name }}</strong>
                  <span>Qty: {{ item.quantity }}</span>
                </div>

                <strong class="summary-price">
                  ₱{{ (item.price * item.quantity).toLocaleString('en-PH') }}
                </strong>
              </div>

              <div class="summary-divider"></div>

              <div class="summary-line">
                <span>Subtotal</span>
                <strong>₱{{ cartSubtotal.toLocaleString('en-PH') }}</strong>
              </div>

              <div class="summary-line">
                <span>Shipping</span>
                <strong>₱{{ shippingFee.toLocaleString('en-PH') }}</strong>
              </div>

              <div class="summary-divider"></div>

              <div class="summary-total">
                <span>Total</span>
                <strong>₱{{ checkoutTotal.toLocaleString('en-PH') }}</strong>
              </div>

              <v-btn type="submit" block color="primary" rounded="lg" size="large" class="place-order-btn"
                :disabled="cartItems.length === 0">
                Place Order
                <v-icon end>mdi-check</v-icon>
              </v-btn>

              <v-btn block variant="text" color="white" class="mt-2" @click="closeCheckout">
                Back to Cart
              </v-btn>
            </div>
          </div>
        </v-form>
      </div>
    </div>

    <!-- ORDER SUCCESS POPUP -->
    <div v-if="orderSuccessDialog" class="product-modal-overlay success-overlay">
      <div class="success-modal">
        <div class="success-icon">
          <v-icon size="48" color="#34e6b5">
            mdi-check-circle
          </v-icon>
        </div>

        <h2>Order Successfully Placed!</h2>

        <p>
          Thank you for shopping with MindCast!
          Your order has been placed successfully.
        </p>

        <div class="success-order-info">
          <span>Order Total</span>
          <strong>₱{{ completedOrderTotal.toLocaleString('en-PH') }}</strong>
        </div>

        <v-btn block color="primary" rounded="lg" class="mt-5" @click="continueShopping">
          Continue Shopping
          <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- SNACKBAR -->
    <v-snackbar v-model="snackbar" color="surface" location="bottom end" timeout="2500">
      <v-icon color="primary" start>mdi-check-circle</v-icon>
      {{ snackbarMessage }}
    </v-snackbar>

  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, reactive } from 'vue'

interface Product {
  id: number
  name: string
  category: string
  price: number
  description: string
  image: string
  reviews: number
}

interface CartItem extends Product {
  quantity: number
}

interface Customer {
  fullName: string
  phone: string
  email: string
  address: string
  paymentMethod: string
}

// CATEGORIES
const categories = [
  'All Products',
  'Books',
  'Stationery',
  'Journals',
  'Accessories',
]

// PAGE STATE
const selectedCategory = ref('All Products')
const search = ref('')
const favorites = ref<number[]>([])
const snackbar = ref(false)
const snackbarMessage = ref('')

// PRODUCT DETAILS
const detailsDialog = ref(false)
const selectedProduct = ref<Product | null>(null)
const quantity = ref(1)

// SHOPPING CART
const cartDialog = ref(false)
const cartItems = ref<CartItem[]>([])

// CHECKOUT
const checkoutDialog = ref(false)
const checkoutForm = ref<any>(null)
const shippingFee = 50

const customer = reactive<Customer>({
  fullName: '',
  phone: '',
  email: '',
  address: '',
  paymentMethod: 'Cash on Delivery (COD)',
})

// ORDER SUCCESS
const orderSuccessDialog = ref(false)
const completedOrderTotal = ref(0)

// VALIDATION RULES
const requiredRule = (value: string) =>
  !!value?.trim() || 'This field is required.'

const emailRule = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Enter a valid email address.'

const phoneRule = (value: string) =>
  /^[0-9+\-\s()]{7,20}$/.test(value) || 'Enter a valid phone number.'

// CART COUNT
const cartCount = computed(() =>
  cartItems.value.reduce(
    (total, item) => total + item.quantity,
    0
  )
)

// CART SUBTOTAL
const cartSubtotal = computed(() =>
  cartItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
)

// CHECKOUT TOTAL
const checkoutTotal = computed(() =>
  cartSubtotal.value + shippingFee
)

// PRODUCTS
const products: Product[] = [
  {
    id: 1,
    name: 'The Power of Habits',
    category: 'Books',
    price: 399,
    description: 'Learn how small habits can change your life.',
    image: '/images/habits.png',
    reviews: 128,
  },
  {
    id: 2,
    name: 'Mindset Matters',
    category: 'Books',
    price: 399,
    description: 'Develop a positive and growth-oriented mindset.',
    image: '/images/mindset.png',
    reviews: 96,
  },
  {
    id: 3,
    name: 'The Art of Focus',
    category: 'Books',
    price: 399,
    description: 'Improve your focus and everyday productivity.',
    image: '/images/focus.png',
    reviews: 85,
  },
  {
    id: 4,
    name: 'Study Smart',
    category: 'Books',
    price: 399,
    description: 'Helpful tips and strategies for students.',
    image: '/images/study.png',
    reviews: 112,
  },
  {
    id: 5,
    name: 'Sticky Notes Set',
    category: 'Stationery',
    price: 99,
    description: 'Perfect for reminders and quick notes.',
    image: '/images/stickynotes.png',
    reviews: 74,
  },
  {
    id: 6,
    name: 'Premium Pen Set',
    category: 'Stationery',
    price: 149,
    description: 'Smooth writing pens for everyday use.',
    image: '/images/pens.jpg',
    reviews: 63,
  },
  {
    id: 7,
    name: 'Highlighter Set',
    category: 'Stationery',
    price: 119,
    description: 'Colorful highlighters for important notes.',
    image: '/images/highlighters.png',
    reviews: 91,
  },
  {
    id: 8,
    name: 'Study Supplies Kit',
    category: 'Stationery',
    price: 299,
    description: 'Essential school supplies in one set.',
    image: '/images/studykit.png',
    reviews: 105,
  },
  {
    id: 9,
    name: 'Daily Planner',
    category: 'Journals',
    price: 199,
    description: 'Organize your daily tasks and schedules.',
    image: '/images/planner.png',
    reviews: 128,
  },
  {
    id: 10,
    name: 'Self-Reflection Journal',
    category: 'Journals',
    price: 199,
    description: 'Write your thoughts, goals, and ideas.',
    image: '/images/self.png',
    reviews: 86,
  },
  {
    id: 11,
    name: 'Gratitude Journal',
    category: 'Journals',
    price: 199,
    description: 'Practice gratitude and positive thinking.',
    image: '/images/gratitude.png',
    reviews: 93,
  },
  {
    id: 12,
    name: 'Hardcover Notebook',
    category: 'Journals',
    price: 249,
    description: 'A simple notebook for your everyday thoughts.',
    image: '/images/hardcover.jpg',
    reviews: 57,
  },
  {
    id: 13,
    name: 'Desk Organizer',
    category: 'Accessories',
    price: 349,
    description: 'Keep your workspace clean and organized.',
    image: '/images/deskorganizer.jpg',
    reviews: 68,
  },
  {
    id: 14,
    name: 'Personalized Tumbler',
    category: 'Accessories',
    price: 199,
    description: 'Stay hydrated while studying or working.',
    image: '/images/tumbler.jpg',
    reviews: 82,
  },
  {
    id: 15,
    name: 'Bookmark',
    category: 'Accessories',
    price: 99,
    description: 'A handy bookmark for your favorite books.',
    image: '/images/bookmark.jpg',
    reviews: 49,
  },
  {
    id: 16,
    name: 'Laptop Stand',
    category: 'Accessories',
    price: 399,
    description: 'A convenient stand for your study setup.',
    image: '/images/stand.jpg',
    reviews: 72,
  },
]

// FILTER PRODUCTS
const filteredProducts = computed(() => {
  const keyword = search.value.toLowerCase().trim()

  return products.filter((product) => {
    const matchesCategory =
      selectedCategory.value === 'All Products' ||
      product.category === selectedCategory.value

    const matchesSearch =
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)

    return matchesCategory && matchesSearch
  })
})

// OPEN PRODUCT DETAILS
function openProductDetails(product: Product) {
  selectedProduct.value = product
  quantity.value = 1
  detailsDialog.value = true
}

// CLOSE PRODUCT DETAILS
function closeProductDetails() {
  detailsDialog.value = false
  selectedProduct.value = null
}

// PRODUCT QUANTITY
function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function increaseQuantity() {
  quantity.value++
}

// WISHLIST
function toggleFavorite(id: number) {
  if (favorites.value.includes(id)) {
    favorites.value = favorites.value.filter((item) => item !== id)
    snackbarMessage.value = 'Removed from wishlist.'
  } else {
    favorites.value.push(id)
    snackbarMessage.value = 'Added to wishlist!'
  }

  snackbar.value = true
}

// SAVE CART
function saveCart() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(
      'mindcast-cart',
      JSON.stringify(cartItems.value)
    )
  }
}

// LOAD CART
function loadCart() {
  if (typeof window === 'undefined') return

  try {
    const savedCart = localStorage.getItem('mindcast-cart')
    cartItems.value = savedCart ? JSON.parse(savedCart) : []
  } catch (error) {
    console.error('Unable to load cart:', error)
    cartItems.value = []
  }
}

// ADD PRODUCT TO CART
function addToCart(product: Product, amount = 1) {
  const existingProduct = cartItems.value.find(
    (item) => item.id === product.id
  )

  if (existingProduct) {
    existingProduct.quantity += amount
  } else {
    cartItems.value.push({
      ...product,
      quantity: amount,
    })
  }

  saveCart()

  snackbarMessage.value = `${product.name} added to cart!`
  snackbar.value = true
}

// ADD SELECTED PRODUCT FROM DETAILS
function addSelectedProductToCart() {
  if (!selectedProduct.value) return

  addToCart(selectedProduct.value, quantity.value)
  closeProductDetails()
}

// CHANGE CART QUANTITY
function changeCartQuantity(id: number, amount: number) {
  const item = cartItems.value.find(
    (product) => product.id === id
  )

  if (!item) return

  item.quantity = Math.max(1, item.quantity + amount)
  saveCart()
}

// REMOVE PRODUCT FROM CART
function removeFromCart(id: number) {
  cartItems.value = cartItems.value.filter(
    (item) => item.id !== id
  )

  saveCart()

  snackbarMessage.value = 'Product removed from cart.'
  snackbar.value = true
}

// OPEN CHECKOUT
function openCheckout() {
  if (cartItems.value.length === 0) return

  cartDialog.value = false
  checkoutDialog.value = true
}

// CLOSE CHECKOUT AND RETURN TO CART
function closeCheckout() {
  checkoutDialog.value = false
  cartDialog.value = true
}

// PLACE ORDER
async function placeOrder() {
  if (cartItems.value.length === 0) return

  const result = await checkoutForm.value?.validate()

  if (!result?.valid) return

  // SAVE ORDER TOTAL BEFORE CLEARING CART
  completedOrderTotal.value = checkoutTotal.value

  // CLEAR CART ONLY AFTER PLACE ORDER
  cartItems.value = []
  localStorage.removeItem('mindcast-cart')

  // CLOSE CHECKOUT
  checkoutDialog.value = false

  // SHOW SUCCESS POPUP
  orderSuccessDialog.value = true
}

// CONTINUE SHOPPING
function continueShopping() {
  orderSuccessDialog.value = false
  cartDialog.value = false
  checkoutDialog.value = false
  detailsDialog.value = false
  selectedProduct.value = null
}

// RESET FILTERS
function resetFilters() {
  selectedCategory.value = 'All Products'
  search.value = ''
}

// KEYBOARD ESCAPE
function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    if (orderSuccessDialog.value) {
      continueShopping()
    } else if (checkoutDialog.value) {
      closeCheckout()
    } else if (detailsDialog.value) {
      closeProductDetails()
    } else if (cartDialog.value) {
      cartDialog.value = false
    }
  }
}

// LIFECYCLE
onMounted(() => {
  loadCart()
  window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
/* PAGE HEADING */
.products-heading {
  font-family: Georgia, serif;
  font-size: clamp(35px, 4vw, 48px);
  color: #34e6b5;
  font-weight: 700;
}

/* GENERAL OVERLAY */
.product-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.82);
  backdrop-filter: blur(7px);
}

/* CLOSE BUTTON */
.modal-close {
  position: absolute;
  z-index: 5;
  top: 12px;
  right: 12px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.modal-close:hover {
  background: #087f5b;
}

/* PRODUCT DETAILS MODAL */
.product-modal {
  position: relative;
  width: 100%;
  max-width: 950px;
  max-height: 90vh;
  overflow-y: auto;
  background: #0b211b;
  border: 1px solid rgba(52, 230, 181, 0.35);
  border-radius: 18px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
}

.modal-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 35px;
}

.modal-image {
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #102c23;
  border-radius: 14px;
  overflow: hidden;
}

.modal-image img {
  width: 100%;
  height: 100%;
  min-height: 350px;
  object-fit: contain;
}

.modal-details {
  padding: 15px 5px;
  color: #f5fff9;
}

.modal-title {
  margin: 5px 0 12px;
  font-family: Georgia, serif;
  font-size: clamp(25px, 3vw, 34px);
  color: #34e6b5;
}

.rating-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 3px;
  color: #c3d5cc;
  font-size: 13px;
}

.rating-row span {
  margin-left: 8px;
}

.modal-price {
  margin: 22px 0;
  font-size: 30px;
  font-weight: 700;
  color: #34e6b5;
}

.modal-description {
  color: #bdcec6;
  line-height: 1.8;
  margin-bottom: 25px;
}

.quantity-label {
  margin-bottom: 10px;
  font-weight: 600;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 20px;
}

.quantity-control button {
  width: 36px;
  height: 36px;
  color: #34e6b5;
  background: transparent;
  border: 1px solid rgba(52, 230, 181, 0.5);
  border-radius: 8px;
  font-size: 22px;
  cursor: pointer;
}

.quantity-control button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.quantity-control span {
  min-width: 20px;
  text-align: center;
  font-weight: 700;
}

.modal-total {
  margin: 22px 0;
  color: #bdcec6;
}

.modal-total strong {
  color: #34e6b5;
  font-size: 20px;
  margin-left: 8px;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* CART ICON + SEARCH */
.search-cart-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.cart-icon-button {
  flex-shrink: 0;
  border-radius: 12px;
  border-color: rgba(52, 230, 181, 0.5);
}

.search-field {
  flex: 1;
  min-width: 0;
}

/* CART MODAL */
.cart-modal {
  position: relative;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 28px;
  background: #0b211b;
  border: 1px solid rgba(52, 230, 181, 0.35);
  border-radius: 18px;
  color: #f5fff9;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
}

.cart-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(52, 230, 181, 0.2);
}

.cart-title {
  display: flex;
  align-items: center;
  color: #34e6b5;
  font-family: Georgia, serif;
  font-size: 27px;
}

.empty-cart {
  padding: 45px 15px;
  text-align: center;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(52, 230, 181, 0.15);
}

.cart-item-image {
  width: 85px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  background: #102c23;
}

.cart-item-info {
  flex: 1;
  min-width: 0;
}

.cart-item-info h3 {
  margin: 4px 0;
  font-size: 15px;
}

.cart-item-price,
.cart-item-end strong {
  color: #34e6b5;
}

.cart-item-price {
  font-size: 14px;
}

.cart-quantity {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}

.cart-quantity button {
  width: 27px;
  height: 27px;
  color: #34e6b5;
  background: transparent;
  border: 1px solid rgba(52, 230, 181, 0.5);
  border-radius: 6px;
  cursor: pointer;
}

.cart-quantity button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.cart-item-end {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
  font-size: 14px;
}

.remove-cart-item {
  color: #ff7777;
  background: transparent;
  border: none;
  cursor: pointer;
}

.cart-summary {
  padding-top: 22px;
  margin-top: 5px;
}

.cart-summary strong {
  color: #34e6b5;
  font-size: 21px;
}

/* CHECKOUT MODAL */
.checkout-overlay {
  z-index: 100000;
}

.checkout-modal {
  position: relative;
  width: 100%;
  max-width: 1050px;
  max-height: 92vh;
  overflow-y: auto;
  padding: 28px;
  background: #061b15;
  border: 1px solid rgba(52, 230, 181, 0.25);
  border-radius: 18px;
  color: #f5fff9;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.65);
}

.checkout-header {
  position: relative;
  margin-bottom: 24px;
}

.checkout-title {
  color: #34e6b5;
  font-family: Georgia, serif;
  font-size: 32px;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1.5fr 0.95fr;
  gap: 32px;
  align-items: start;
}

.checkout-section-title {
  margin-bottom: 16px;
  color: #f5fff9;
  font-size: 17px;
  font-weight: 700;
}

.checkout-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.field-full {
  grid-column: 1 / -1;
}

.payment-heading {
  margin-top: 24px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  min-height: 52px;
  padding: 12px 16px;
  color: white;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  transition: 0.2s ease;
}

.payment-option span {
  font-size: 14px;
  font-weight: 600;
}

.payment-option:hover {
  border-color: rgba(52, 230, 181, 0.6);
}

.payment-selected {
  background: rgba(52, 230, 181, 0.08);
  border: 1px solid #34e6b5;
}

/* ORDER SUMMARY */
.checkout-summary {
  padding: 20px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.checkout-summary .checkout-section-title {
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 17px;
}

.summary-image {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 7px;
  background: #102c23;
}

.summary-product {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  gap: 4px;
}

.summary-product strong {
  font-size: 12px;
  line-height: 1.4;
}

.summary-product span {
  color: #a8bdb4;
  font-size: 11px;
}

.summary-price {
  font-size: 12px;
  white-space: nowrap;
}

.summary-divider {
  height: 1px;
  margin: 17px 0;
  background: rgba(255, 255, 255, 0.12);
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  font-size: 13px;
}

.summary-line strong {
  font-size: 13px;
}

.summary-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 17px;
  font-weight: 700;
}

.summary-total strong {
  color: #34e6b5;
  font-size: 19px;
}

.place-order-btn {
  min-height: 46px;
  font-weight: 700;
}

/* ORDER SUCCESS POPUP */
.success-overlay {
  z-index: 100001;
}

.success-modal {
  width: 100%;
  max-width: 420px;
  padding: 40px 30px;
  text-align: center;
  background: #0b211b;
  border: 1px solid rgba(52, 230, 181, 0.4);
  border-radius: 20px;
  color: #f5fff9;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
  animation: successPop 0.3s ease;
}

.success-icon {
  width: 85px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  background: rgba(52, 230, 181, 0.12);
  border: 1px solid rgba(52, 230, 181, 0.35);
  border-radius: 50%;
}

.success-modal h2 {
  color: #34e6b5;
  font-family: Georgia, serif;
  font-size: 25px;
  margin-bottom: 12px;
}

.success-modal p {
  color: #bdcec6;
  line-height: 1.7;
}

.success-order-info {
  display: flex;
  justify-content: space-between;
  margin-top: 22px;
  padding: 14px;
  background: rgba(52, 230, 181, 0.08);
  border-radius: 8px;
  font-size: 14px;
}

.success-order-info strong {
  color: #34e6b5;
}

@keyframes successPop {
  from {
    opacity: 0;
    transform: scale(0.85);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* RESPONSIVE */
@media (max-width: 800px) {
  .checkout-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .checkout-summary {
    width: 100%;
  }
}

@media (max-width: 700px) {
  .product-modal-overlay {
    padding: 10px;
  }

  .modal-content {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 20px;
  }

  .modal-image,
  .modal-image img {
    min-height: 220px;
    max-height: 260px;
  }

  .modal-details {
    padding: 5px 0;
  }

  .cart-modal {
    padding: 18px;
  }

  .cart-item {
    gap: 10px;
  }

  .cart-item-image {
    width: 65px;
    height: 75px;
  }

  .cart-item-info h3 {
    font-size: 13px;
  }

  .cart-item-end {
    font-size: 12px;
  }

  .checkout-modal {
    padding: 20px 15px;
  }

  .checkout-fields {
    grid-template-columns: 1fr;
  }

  .field-full {
    grid-column: auto;
  }

  .checkout-title {
    font-size: 28px;
  }
}
</style>

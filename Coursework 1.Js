const { createApp } = Vue;
// Assuming FontAwesome is already included in the HTML
createApp({ // Vue app instance
  data() { // Application state
    return {
      lessons: [
        {
          id: 1,
          subject: "Maths",
          location: "London",
          price: 20,
          spaces: 5,
          iconClass: "fa-solid fa-calculator"
        },
        {
          id: 2,
          subject: "English",
          location: "Manchester",
          price: 18,
          spaces: 5,
          iconClass: "fa-solid fa-book"
        },
        {
          id: 3,
          subject: "Physics",
          location: "Birmingham",
          price: 25,
          spaces: 5,
          iconClass: "fa-solid fa-atom"
        },
        {
          id: 4,
          subject: "Chemistry",
          location: "Leeds",
          price: 24,
          spaces: 5,
          iconClass: "fa-solid fa-flask"
        },
        {
          id: 5,
          subject: "Biology",
          location: "Liverpool",
          price: 22,
          spaces: 5,
          iconClass: "fa-solid fa-dna"
        },
        {
          id: 6,
          subject: "History",
          location: "London",
          price: 19,
          spaces: 5,
          iconClass: "fa-solid fa-landmark"
        },
        {
          id: 7,
          subject: "Geography",
          location: "Bristol",
          price: 21,
          spaces: 5,
          iconClass: "fa-solid fa-globe"
        },
        {
          id: 8,
          subject: "Computer Science",
          location: "Cambridge",
          price: 30,
          spaces: 5,
          iconClass: "fa-solid fa-computer"
        },
        {
          id: 9,
          subject: "Art & Design",
          location: "Brighton",
          price: 23,
          spaces: 5,
          iconClass: "fa-solid fa-palette"
        },
        {
          id: 10,
          subject: "Religious Studies",
          location: "Oxford",
          price: 26,
          spaces: 5,
          iconClass: "fa-solid fa-book-bible"
        }
      ],
      cart: [], // { lesson: <lessonObj>, quantity: number }
      showCart: false,
      sortAttribute: "subject",
      sortOrder: "asc",
      searchQuery: "",
      name: "",
      phone: "",
      orderSubmitted: false
    };
  },
  computed: {
    // Filter lessons by search query across subject, location, price, spaces
    filteredLessons() {
      if (!this.searchQuery.trim()) {
        return this.lessons;
      }
      const q = this.searchQuery.toLowerCase();

      return this.lessons.filter((lesson) => {
        const subject = lesson.subject.toLowerCase();
        const location = lesson.location.toLowerCase();
        const price = lesson.price.toString().toLowerCase();
        const spaces = lesson.spaces.toString().toLowerCase();

        return (
          subject.includes(q) ||
          location.includes(q) ||
          price.includes(q) ||
          spaces.includes(q)
        );
      });
    },

    // Sort lessons based on attribute and order
    sortedLessons() {
      const lessonsCopy = [...this.filteredLessons];

      lessonsCopy.sort((a, b) => {
        let valA = a[this.sortAttribute];
        let valB = b[this.sortAttribute];

        // For strings, compare case-insensitively
        if (typeof valA === "string") {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return this.sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return this.sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      return lessonsCopy;
    },

    totalItemsInCart() {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    cartTotal() {
      return this.cart.reduce(
        (sum, item) => sum + item.lesson.price * item.quantity,
        0
      );
    },

    isNameValid() {
      const trimmed = this.name.trim();
      return trimmed.length > 0 && /^[A-Za-z\s]+$/.test(trimmed);
    },

    isPhoneValid() {
      const trimmed = this.phone.trim();
      return trimmed.length > 0 && /^\d+$/.test(trimmed);
    },

    canCheckout() {
      return this.isNameValid && this.isPhoneValid && this.cart.length > 0;
    }
  },
  methods: {
    addToCart(lesson) {
      if (lesson.spaces <= 0) return;

      let cartItem = this.cart.find((item) => item.lesson.id === lesson.id);

      if (!cartItem) {
        cartItem = { lesson, quantity: 0 };
        this.cart.push(cartItem);
      }

      cartItem.quantity += 1;
      lesson.spaces -= 1;
    },

    removeFromCart(item) {
      if (item.quantity <= 0) return;

      item.quantity -= 1;
      item.lesson.spaces += 1;

      if (item.quantity === 0) {
        this.cart = this.cart.filter(
          (cartItem) => cartItem.lesson.id !== item.lesson.id
        );
      }
    },

    toggleCartView() {
      if (this.cart.length === 0) return; // just in case
      this.showCart = !this.showCart;
    },

    checkout() {
      if (!this.canCheckout) return;

      // Display confirmation message
      this.orderSubmitted = true;

      // Optionally clear cart after checkout
      this.cart = [];

      // Optionally reset lessons' spaces? (Specification doesn't require it)
      // Keep spaces as they are to reflect booked places.

      // You can also show an alert if desired:
      // alert("Your order has been submitted!");
    }
  }
}).mount("#app");

/**
 * STAK — Shopify Buy Button (loads SDK once, inits per mount node)
 */
(function () {
  var SCRIPT_URL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  var DOMAIN = '3u0cfe-xa.myshopify.com';
  var STOREFRONT_ACCESS_TOKEN = 'f8a21491636f1976ae4babaf30e686b3';

  var BUY_BUTTON_OPTIONS = {
    product: {
      styles: {
        product: {
          '@media (min-width: 601px)': {
            'max-width': '100%',
            'margin-left': '0',
            'margin-bottom': '0',
          },
        },
        button: {
          color: '#fdfdfd',
          ':hover': {
            color: '#fdfdfd',
            'background-color': '#352f23',
          },
          'background-color': '#3b3427',
          ':focus': {
            'background-color': '#352f23',
          },
        },
      },
      text: {
        button: 'Add to cart',
      },
    },
    productSet: {
      styles: {
        products: {
          '@media (min-width: 601px)': {
            'margin-left': '-20px',
          },
        },
      },
    },
    modalProduct: {
      contents: {
        img: false,
        imgWithCarousel: true,
        button: false,
        buttonWithQuantity: true,
      },
      styles: {
        product: {
          '@media (min-width: 601px)': {
            'max-width': '100%',
            'margin-left': '0px',
            'margin-bottom': '0px',
          },
        },
        button: {
          color: '#fdfdfd',
          ':hover': {
            color: '#fdfdfd',
            'background-color': '#352f23',
          },
          'background-color': '#3b3427',
          ':focus': {
            'background-color': '#352f23',
          },
        },
      },
      text: {
        button: 'Add to cart',
      },
    },
    option: {},
    cart: {
      styles: {
        button: {
          color: '#fdfdfd',
          ':hover': {
            color: '#fdfdfd',
            'background-color': '#352f23',
          },
          'background-color': '#3b3427',
          ':focus': {
            'background-color': '#352f23',
          },
        },
      },
      text: {
        total: 'Subtotal',
        button: 'Checkout',
      },
    },
    toggle: {
      styles: {
        toggle: {
          'background-color': '#3b3427',
          ':hover': {
            'background-color': '#352f23',
          },
          ':focus': {
            'background-color': '#352f23',
          },
        },
        count: {
          color: '#fdfdfd',
          ':hover': {
            color: '#fdfdfd',
          },
        },
        iconPath: {
          fill: '#fdfdfd',
        },
      },
    },
  };

  var pending = [];
  var sdkLoading = false;
  var clientReady = null;
  var shopifyClient = null;
  var cartPollStarted = false;

  function getCheckoutStorageKey() {
    return STOREFRONT_ACCESS_TOKEN + '.' + DOMAIN + '.checkoutId';
  }

  function getShopifyStorageKeys() {
    var keys = [];
    var patterns = [
      'shopify-buy',
      'shopify_buy',
      'shopifyCart',
      DOMAIN,
      STOREFRONT_ACCESS_TOKEN,
    ];

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (!key) continue;
      for (var j = 0; j < patterns.length; j++) {
        if (key.indexOf(patterns[j]) !== -1) {
          keys.push(key);
          break;
        }
      }
    }

    return keys;
  }

  function clearShopifyStorage() {
    getShopifyStorageKeys().forEach(function (key) {
      localStorage.removeItem(key);
    });
  }

  function isReturningFromCheckout() {
    var ref = document.referrer || '';
    if (/shopify\.com/i.test(ref)) return true;
    if (/\/checkouts?\//i.test(ref)) return true;
    return false;
  }

  function setNavCartCount(count) {
    var total = Math.max(0, Number(count) || 0);
    document.querySelectorAll('.cart-count').forEach(function (el) {
      el.textContent = String(total);
    });
    document.dispatchEvent(
      new CustomEvent('stak:cart-updated', { detail: { count: total } })
    );
  }

  function getCheckoutQuantity(checkout) {
    if (!checkout || !checkout.lineItems) return 0;
    return checkout.lineItems.reduce(function (sum, item) {
      return sum + (item.quantity || 0);
    }, 0);
  }

  function refreshNavCartCount() {
    if (!shopifyClient) {
      setNavCartCount(0);
      return Promise.resolve(0);
    }

    var checkoutId = localStorage.getItem(getCheckoutStorageKey());
    if (!checkoutId) {
      setNavCartCount(0);
      return Promise.resolve(0);
    }

    return shopifyClient.checkout
      .fetch(checkoutId)
      .then(function (checkout) {
        if (checkout.completedAt) {
          clearShopifyStorage();
          setNavCartCount(0);
          return 0;
        }
        var count = getCheckoutQuantity(checkout);
        setNavCartCount(count);
        return count;
      })
      .catch(function () {
        clearShopifyStorage();
        setNavCartCount(0);
        return 0;
      });
  }

  function verifyCheckoutSession(client) {
    if (isReturningFromCheckout()) {
      clearShopifyStorage();
      return Promise.resolve();
    }

    var checkoutId = localStorage.getItem(getCheckoutStorageKey());
    if (!checkoutId) {
      return Promise.resolve();
    }

    return client.checkout
      .fetch(checkoutId)
      .then(function (checkout) {
        if (checkout.completedAt) {
          clearShopifyStorage();
          return;
        }
        setNavCartCount(getCheckoutQuantity(checkout));
      })
      .catch(function () {
        clearShopifyStorage();
      });
  }

  function resetProductMounts() {
    document.querySelectorAll('.shopify-buy-button-mount').forEach(function (node) {
      node.innerHTML = '';
      delete node.dataset.shopifyMounted;
    });
    clientReady = null;
    shopifyClient = null;
  }

  function recoverCartSessionOnLoad() {
    if (isReturningFromCheckout()) {
      clearShopifyStorage();
      resetProductMounts();
    }
  }

  function handlePageShow(event) {
    if (!event.persisted) return;
    if (!isReturningFromCheckout()) return;
    clearShopifyStorage();
    resetProductMounts();
    window.location.reload();
  }

  function startCartPolling() {
    if (cartPollStarted) return;
    cartPollStarted = true;
    window.setInterval(refreshNavCartCount, 2500);
  }

  recoverCartSessionOnLoad();
  window.addEventListener('pageshow', handlePageShow);

  function loadSdk() {
    return new Promise(function (resolve) {
      if (window.ShopifyBuy && window.ShopifyBuy.UI) {
        resolve();
        return;
      }
      if (sdkLoading) {
        document.addEventListener('shopify-buy-sdk-ready', function onReady() {
          document.removeEventListener('shopify-buy-sdk-ready', onReady);
          resolve();
        });
        return;
      }
      sdkLoading = true;
      var script = document.createElement('script');
      script.async = true;
      script.src = SCRIPT_URL;
      script.onload = function () {
        sdkLoading = false;
        document.dispatchEvent(new Event('shopify-buy-sdk-ready'));
        resolve();
      };
      (document.head || document.body).appendChild(script);
    });
  }

  function getClient() {
    if (clientReady) return clientReady;
    clientReady = loadSdk()
      .then(function () {
        shopifyClient = window.ShopifyBuy.buildClient({
          domain: DOMAIN,
          storefrontAccessToken: STOREFRONT_ACCESS_TOKEN,
        });
        return verifyCheckoutSession(shopifyClient).then(function () {
          return window.ShopifyBuy.UI.onReady(shopifyClient);
        });
      })
      .then(function (ui) {
        refreshNavCartCount();
        startCartPolling();
        return ui;
      });
    return clientReady;
  }

  function mountProduct(componentId, productId) {
    var node = document.getElementById(componentId);
    if (!node || node.dataset.shopifyMounted === 'true') return;

    getClient().then(function (ui) {
      ui.createComponent('product', {
        id: productId,
        node: node,
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: BUY_BUTTON_OPTIONS,
      });
      node.dataset.shopifyMounted = 'true';
      refreshNavCartCount();
    });
  }

  window.initShopifyBuyButton = function (componentId, productId) {
    if (!componentId || !productId) return;
    pending.push({ componentId: componentId, productId: String(productId) });
    flushPending();
  };

  window.refreshShopifyCartCount = refreshNavCartCount;
  window.clearShopifyCartSession = function () {
    clearShopifyStorage();
    resetProductMounts();
    setNavCartCount(0);
    return refreshNavCartCount();
  };

  function flushPending() {
    if (!document.getElementById(pending[0]?.componentId)) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', flushPending);
      }
      return;
    }
    while (pending.length) {
      var item = pending.shift();
      mountProduct(item.componentId, item.productId);
    }
  }

  window.addEventListener('focus', refreshNavCartCount);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      refreshNavCartCount();
    }
  });
})();

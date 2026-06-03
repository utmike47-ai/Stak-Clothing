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
    clientReady = loadSdk().then(function () {
      var client = window.ShopifyBuy.buildClient({
        domain: DOMAIN,
        storefrontAccessToken: STOREFRONT_ACCESS_TOKEN,
      });
      return window.ShopifyBuy.UI.onReady(client);
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
    });
  }

  window.initShopifyBuyButton = function (componentId, productId) {
    if (!componentId || !productId) return;
    pending.push({ componentId: componentId, productId: String(productId) });
    flushPending();
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
})();

require("dotenv").config();

if (process.env.MEM_WATCH === "true") {
  var heapdump = require("heapdump");
  var memwatch = require("memwatch-next");

  console.log("starting memwatch and heapdump");

  setInterval(function() {
    heapdump.writeSnapshot(
      "./analytics/" + Date.now() + ".heapsnapshot",
      function(err, filename) {
        console.log("dump written to", filename);
      }
    );
  }, process.env.MEM_WATCH_INTERVAL);

  memwatch.on("leak", info => {
    console.error("Memory leak detected:\n", info);
  });
}

module.exports = {
  head: {
    title: "Metronome Explorer",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Metronome Explorer"
      },
      { name: "theme-color", content: "#ffffff" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      { rel: "mask-icon", color: "#5bbad5", href: "/safari-pinned-tab.svg" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "manifest", href: "/site.webmanifest" }
    ]
  },

  env: {
    apiUrl: process.env.MTN_API_URL || 'http://localhost:3000',
    socketUrl: process.env.MTN_SOCKET_URL || 'http://localhost:3000',
    ethUrl: process.env.ETH_NODE_URL || 'http://parity.bloqrock.net:8545',
    tracerUrl: process.env.TRACER_URL || 'http://tracer.bloqrock.net'
  },

  serverMiddleware: [{ path: "/health", handler: "~/middlewares/health.js" }],

  loading: { color: "#7E66F4", height: "3px" },

  css: ["bootstrap/dist/css/bootstrap.css", "~/assets/scss/main.scss"],

  modules: ["@nuxtjs/font-awesome"],

  plugins: ["~/plugins/filters", "~/plugins/directives"],

  build: {
    vendor: ["axios", "socket.io-client"],

    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};

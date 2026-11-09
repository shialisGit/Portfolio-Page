/* =========================================================
   Christos Shiali - portfolio interactions
   Vanilla JS. No dependencies.
   ========================================================= */

(function () {
  "use strict";

  var root = document.documentElement;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------------
     Theme
     ------------------------------------------------------- */

  function setTheme(theme, persist) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "light" ? "#f4f1e9" : "#08090b");
    }

    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
      button.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      );
    });

    if (persist) {
      try {
        localStorage.setItem("cs-theme", theme);
      } catch (error) {
        /* storage unavailable - theme still applies for this page */
      }
    }
  }

  var storedTheme = null;
  try {
    storedTheme = localStorage.getItem("cs-theme");
  } catch (error) {
    storedTheme = null;
  }
  setTheme(storedTheme === "light" ? "light" : "dark", false);

  document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      setTheme(current === "light" ? "dark" : "light", true);
    });
  });

  /* -------------------------------------------------------
     Header + mobile navigation
     ------------------------------------------------------- */

  var header = document.querySelector(".site-header");
  var menuButton = document.querySelector("[data-menu-toggle]");
  var siteNav = document.querySelector(".site-nav");

  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  function closeMenu() {
    if (!menuButton || !siteNav) return;
    siteNav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  if (menuButton && siteNav) {
    menuButton.addEventListener("click", function () {
      var open = menuButton.getAttribute("aria-expanded") === "true";
      if (open) {
        closeMenu();
      } else {
        siteNav.classList.add("is-open");
        menuButton.setAttribute("aria-expanded", "true");
        document.body.classList.add("nav-open");
      }
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* -------------------------------------------------------
     Scroll spy for section navigation
     ------------------------------------------------------- */

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav a[href^="#"]')
  );
  var navSections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  if (navSections.length) {
    var spyTicking = false;

    function updateActiveSection() {
      var marker = window.scrollY + window.innerHeight * 0.32;
      var active = null;

      navSections.forEach(function (section) {
        if (section.offsetTop <= marker) active = section;
      });

      navLinks.forEach(function (link) {
        var isActive =
          active && link.getAttribute("href") === "#" + active.id;
        link.classList.toggle("is-active", Boolean(isActive));
        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      spyTicking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!spyTicking) {
          window.requestAnimationFrame(updateActiveSection);
          spyTicking = true;
        }
      },
      { passive: true }
    );

    updateActiveSection();
  }

  /* -------------------------------------------------------
     Reveal-on-scroll
     ------------------------------------------------------- */

  var revealItems = Array.prototype.slice.call(
    document.querySelectorAll("[data-reveal]")
  );

  if (revealItems.length) {
    if ("IntersectionObserver" in window && !reducedMotion) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );

      revealItems.forEach(function (item) {
        revealObserver.observe(item);
      });
    } else {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
    }
  }

  /* -------------------------------------------------------
     Work filters
     ------------------------------------------------------- */

  var filterButtons = Array.prototype.slice.call(
    document.querySelectorAll("[data-filter]")
  );
  var workCards = Array.prototype.slice.call(
    document.querySelectorAll("[data-category]")
  );

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");

      filterButtons.forEach(function (other) {
        var active = other === button;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-pressed", active ? "true" : "false");
      });

      workCards.forEach(function (card) {
        var categories = (card.getAttribute("data-category") || "").split(" ");
        var show = filter === "all" || categories.indexOf(filter) !== -1;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* -------------------------------------------------------
     Local time (Nicosia)
     ------------------------------------------------------- */

  var timeNodes = document.querySelectorAll("[data-local-time]");

  function updateLocalTime() {
    if (!timeNodes.length) return;

    var formatted;
    try {
      formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Nicosia",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
    } catch (error) {
      formatted = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }

    timeNodes.forEach(function (node) {
      node.textContent = formatted;
    });
  }

  updateLocalTime();
  window.setInterval(updateLocalTime, 30000);

  /* -------------------------------------------------------
     Footer year
     ------------------------------------------------------- */

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  /* -------------------------------------------------------
     Copy email
     ------------------------------------------------------- */

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy");
      var original = button.getAttribute("data-label") || button.textContent;

      function confirmCopy() {
        button.textContent = "Copied";
        window.setTimeout(function () {
          button.textContent = original;
        }, 1800);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(confirmCopy).catch(function () {
          window.location.href = "mailto:" + value;
        });
      } else {
        window.location.href = "mailto:" + value;
      }
    });
  });

  /* -------------------------------------------------------
     Case-study table of contents
     ------------------------------------------------------- */

  var tocLinks = Array.prototype.slice.call(
    document.querySelectorAll(".case-toc a[href^='#']")
  );
  var tocSections = tocLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  if (tocLinks.length && tocSections.length && "IntersectionObserver" in window) {
    var tocObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          tocLinks.forEach(function (link) {
            var active =
              link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("is-active", active);
            if (active) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 }
    );

    tocSections.forEach(function (section) {
      tocObserver.observe(section);
    });
  }

  /* -------------------------------------------------------
     Hero signal field
     ------------------------------------------------------- */

  var canvas = document.getElementById("signal-canvas");

  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var width = 0;
    var height = 0;
    var dpr = 1;
    var nodes = [];
    var frame = null;
    var running = false;
    var resizeFrame = null;

    function makeNodes() {
      var count = Math.max(26, Math.min(62, Math.round((width * height) / 8200)));
      nodes = [];

      for (var i = 0; i < count; i += 1) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.11,
          vy: (Math.random() - 0.5) * 0.11,
          radius: Math.random() < 0.13 ? 2.2 : 1.15,
          accent: Math.random() < 0.28,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function resizeCanvas() {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeNodes();
      render(performance.now());
    }

    function render(timestamp) {
      if (!width || !height) return;
      var time = reducedMotion ? 0 : timestamp / 1000;

      ctx.clearRect(0, 0, width, height);

      var glow = ctx.createRadialGradient(
        width * 0.72,
        height * 0.28,
        0,
        width * 0.72,
        height * 0.28,
        Math.max(width, height) * 0.82
      );
      glow.addColorStop(0, "rgba(118, 185, 0, 0.095)");
      glow.addColorStop(0.48, "rgba(118, 185, 0, 0.025)");
      glow.addColorStop(1, "rgba(118, 185, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      var linkDistance = Math.min(150, Math.max(105, width * 0.15));

      for (var i = 0; i < nodes.length; i += 1) {
        for (var j = i + 1; j < nodes.length; j += 1) {
          var dx = nodes[i].x - nodes[j].x;
          var dy = nodes[i].y - nodes[j].y;
          var distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < linkDistance) {
            var alpha = (1 - distance / linkDistance) * 0.21;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = "rgba(236, 235, 230, " + alpha.toFixed(3) + ")";
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(function (node) {
        if (node.accent && !reducedMotion) {
          var progress = ((time * 0.22 + node.phase) % 1);
          ctx.beginPath();
          ctx.arc(node.x, node.y, 4 + progress * 22, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(155, 214, 74, " + ((1 - progress) * 0.16).toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.accent
          ? "rgba(155, 214, 74, 0.92)"
          : "rgba(236, 235, 230, 0.5)";
        ctx.fill();
      });

      if (!reducedMotion) {
        nodes.forEach(function (node) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < -8) node.x = width + 8;
          if (node.x > width + 8) node.x = -8;
          if (node.y < -8) node.y = height + 8;
          if (node.y > height + 8) node.y = -8;
        });
      }
    }

    function loop(timestamp) {
      if (!running) return;
      render(timestamp);
      frame = window.requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      if (reducedMotion) {
        render(performance.now());
        return;
      }
      running = true;
      frame = window.requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = null;
    }

    if ("ResizeObserver" in window) {
      var resizeObserver = new ResizeObserver(function () {
        if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(resizeCanvas);
      });
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener("resize", resizeCanvas);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });

    resizeCanvas();
    start();
  }
})();

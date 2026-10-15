// ==UserScript==
// @name CnvMP3 Minimalist UI
// @namespace http://tampermonkey.net/
// @version 1.1
// @description Minimalist CnvMP3 with 320kb/s default and clean label
// @author You
// @match *://*.cnvmp3.com/*
// @match *://cnvmp3.com/*
// @run-at document-start
// @grant none
// ==/UserScript==

(function() {
    'use strict';

    const css = `
        header,
        footer,
        section.main-content.content-first:not(#converter-section),
        #goal-overlay-app,
        .note,
        .bottom-items,
        #donate-btn,
        [id^="kofi-widget-overlay"],
        .floatingchat-container-wrap,
        .floatingchat-container-wrap-mobi {
            display: none !important;
        }

        html, body {
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            overflow: hidden !important;
        }

        main {
            width: 100% !important;
            max-width: 750px !important;
            margin: 0 auto !important;
            padding: 20px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
        }

        #converter-section {
            width: 100% !important;
            margin: 0 !important;
        }
    `;

    const addStyle = () => {
        const target = document.head || document.documentElement;
        if (target) {
            const style = document.createElement('style');
            style.textContent = css;
            target.appendChild(style);
        } else {
            setTimeout(addStyle, 10);
        }
    };

    const applyCustomizations = () => {
        // 1. Change "Enter YouTube Video or Shorts URL" to "URL:"
        const urlLabel = document.querySelector('.social-input-youtube');
        if (urlLabel) {
            urlLabel.textContent = 'URL:';
        }

        // 2. Auto-select 320kb/s
        const option320 = document.getElementById('quality-audio-select-list-320');
        const displayValue = document.getElementById('quality-audio-select-display-value');

        if (option320 && displayValue) {
            // Update active class on dropdown items
            document.querySelectorAll('.quality-audio-select-options').forEach(opt => {
                opt.classList.remove('active');
            });
            option320.classList.add('active');

            // Update visible text (the site reads this textContent when you click Convert)
            displayValue.textContent = '320kb/s';
        }
    };

    addStyle();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyCustomizations);
    } else {
        applyCustomizations();
    }
})();

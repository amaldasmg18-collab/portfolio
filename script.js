// Portfolio behaviour: theme toggle, mobile menu, active nav link, footer year, safe terminal.
(function () {
  'use strict';
  var root = document.documentElement;

  // ----- Theme toggle (storage may be blocked, so every access is wrapped) -----
  var themeBtn = document.getElementById('theme-toggle');
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var isLight = theme === 'light';
    themeBtn.setAttribute('aria-pressed', String(isLight));
    themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isLight ? '#F6F8F5' : '#0B0F0D');
  }
  applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* preference just won't persist */ }
  });

  // ----- Mobile menu -----
  var menuBtn = document.getElementById('menu-toggle');
  var links = document.getElementById('nav-links');
  function setMenu(open) {
    links.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
  });

  // ----- Highlight the nav link of the section in view -----
  var navAnchors = links.querySelectorAll('a');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navAnchors.forEach(function (a) {
      var section = document.querySelector(a.getAttribute('href'));
      if (section) observer.observe(section);
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();

  // ----- Terminal: whitelist of commands, answers are fixed text, nothing is executed -----
  var COMMANDS = {
    help: 'Available commands: help, about, skills, projects, contact, clear',
    about: 'Amaldas MG, cybersecurity student in Kochi, Kerala. Focus: SOC workflows, Blue Team operations, threat detection, Linux and networking. OCSP training at Offenso Hackers Academy is in progress.',
    skills: 'Foundations: Linux, Networking, Kali Linux\nSOC and defensive: SIEM concepts, Log analysis, Threat detection, Splunk, Wazuh, MITRE ATT&CK\nExploration: Android security, Practical labs',
    projects: '1. SOC Log Analyzer: Django app for log upload, detection rules and alert triage.\n   https://github.com/amaldasmg18-collab/SOC_Log_Analyzer\n2. TryHackMe labs: Networking Concepts completed, practice ongoing.\n   https://tryhackme.com/p/amaldasmg18',
    contact: 'Email: amaladasmg18@gmail.com\nGitHub: github.com/amaldasmg18-collab\nLinkedIn: linkedin.com/in/amaldas-mg18\nTryHackMe: tryhackme.com/p/amaldasmg18'
  };
  var out = document.getElementById('term-out');
  var form = document.getElementById('term-form');
  var input = document.getElementById('term-input');

  function print(text, className) {
    var line = document.createElement('div');
    if (className) line.className = className;
    line.textContent = text; // textContent keeps user input from ever being parsed as HTML
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
  }

  print('Type "help" to see what this terminal can do.');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var raw = input.value.trim();
    input.value = '';
    if (!raw) return;
    var name = raw.toLowerCase();
    if (name === 'clear') { out.textContent = ''; return; }
    print('$ ' + raw, 'cmd');
    // hasOwnProperty check stops inputs like "constructor" from matching inherited object keys
    if (Object.prototype.hasOwnProperty.call(COMMANDS, name)) print(COMMANDS[name]);
    else print('Unknown command. Type "help" for the list.');
  });
})();

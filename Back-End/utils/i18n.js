const en = require("../locales/en.json");
const ar = require("../locales/ar.json");

function language(req) {
  const header = req.get("x-language") || req.get("accept-language") || "en";
  return String(header).toLowerCase().startsWith("ar") ? "ar" : "en";
}

function t(req, key, vars = {}) {
  const dict = language(req) === "ar" ? ar : en;
  const value = key.split(".").reduce((node, part) => node?.[part], dict);
  if (typeof value !== "string") return key;
  return value.replace(/\{\{(\w+)\}\}/g, (_, name) => vars[name] ?? "");
}

module.exports = { t, language };

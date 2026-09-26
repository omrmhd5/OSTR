import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("footer.company"),
      links: ["about", "features", "works", "career"],
    },
    {
      title: t("footer.help"),
      links: ["support", "delivery", "terms", "privacy"],
    },
    {
      title: t("footer.faq"),
      links: ["account", "manageDeliveries", "orders", "payments"],
    },
    {
      title: t("footer.resources"),
      links: ["ebooks", "tutorial", "blog", "youtube"],
    },
  ];

  return (
    <footer className=" text-t_clr text-center bg-grey-900 p-10 bg-white font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 mb-15">
        <div>
          <Link to="/">
            <h3 className="text-4xl font-extrabold delay-150 duration-300 ease-in-out hover:scale-110 cursor-pointer text-left hover:translate-x-2">
              OSTR
            </h3>
          </Link>

          <p className="text-sm mt-5 text-left">
            {t("footer.taglineLine1")} <br /> {t("footer.taglineLine2")}
          </p>
          <div className="flex gap-4 mt-5 text-2xl">
            {["fa-facebook", "fa-instagram", "fa-tiktok", "fa-twitter"].map(
              (brand, index) => (
                <span
                  className="bg-gray-100 dark:bg-white p-2 px-3 cursor-pointer rounded-full hover:-translate-y-1 hover:scale-110 hover:text-sky-950 duration-300 ease-in-out"
                  key={index}>
                  <i className={`fa-brands ${brand} `} />
                </span>
              )
            )}
          </div>
        </div>

        {columns.map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold mb-5">{section.title}</h4>
            <ul className="mt-2 space-y-2 text-sm">
              {section.links.map((content) => (
                <li
                  className="hover:text-sky-950 hover:underline underline-offset-4 cursor-pointer"
                  key={content}>
                  {t(`footer.links.${content}`)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr />
      <p className="text-sm text-left mt-5">{t("footer.copyright")}</p>
      <div className="flex gap-4 text-3xl justify-end -mt-5">
        {["visa", "mastercard", "paypal", "apple-pay"].map((payment, index) => (
          <i key={index} className={`fa-brands fa-cc-${payment}`} />
        ))}
      </div>
    </footer>
  );
}

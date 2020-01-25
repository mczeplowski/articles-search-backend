import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Article } from "../entity/Article";

export class CreateArticles1576441866255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const articleRepository = getRepository(Article);
    const articles = [
      {
        author: "Mateusz Czepłowski",
        content:
          "Oficjalnie z urazami zmagają się ciągle Marco Asensio, Eden Hazard, Marcelo oraz Lucas Vázquez. James Rodríguez od trzech dni pracował z grupą, ale nie znalazł uznania w oczach trenera. Poza nim szkoleniowcy skreślili Álvaro Odriozolę i Mariano. Po raz kolejny w kadrze meczowej znajdą się za to Nacho czy Brahim. Małe urazy z meczu na Camp Nou nie przeszkodziły też w powołaniu Sergio Ramosa czy Rafy Varane'a.",
        keyWords: "piłka nożna, skład, real madrid",
        title: "Skład realu madryt"
      },
      {
        author: "Tomasz Sienkiewicz",
        content:
          "Real Madryt do ostatniego meczu w 2019 roku podchodzi bez Casemiro. Chociaż jeszcze kilka tygodni temu nikt nie wyobrażał sobie takiego scenariusza, dzisiaj to alternatywne zestawienie środka pola bez Brazylijczyka wzbudza zaufanie.",
        keyWords: "piłka nożna, skład, real madrid",
        title: "Przewidywane składy"
      },
      {
        author: "Mateusz Waligóra",
        content:
          "Today we are releasing React 16.9. It contains several new features, bugfixes, and new deprecation warnings to help prepare for a future major release.",
        keyWords: "react, javascript, update",
        title: "React v16.9.0 and the Roadmap Update"
      },
      {
        author: "Rysiu Peja",
        content:
          "We’re excited to announce an ongoing effort to maintain official translations of the React documentation website into different languages. Thanks to the dedicated efforts of React community members from around the world, React is now being translated into over 30 languages! You can find them on the new Languages page.",
        keyWords: "react, javascript, update",
        title: "Is React Translated Yet? ¡Sí! Sim! はい！"
      },
      {
        author: "Kaspian",
        content:
          "So you’ve just launched your Vue.js website, congrats! Now you want to add a blog that quickly plugs into your website and you don’t want to have to spin up a whole server just to host a Wordpress instance (or any DB-powered CMS for that matter). You want to just be able to add a few Vue.js blog components and some routes and have it all just work, right? What you’re looking for is a blog that’s powered entirely by API’s you can consume directly from your Vue.js application. This tutorial will teach you how to do just that, let’s dive in!",
        keyWords: "vue, javascript",
        title: "Create a CMS-Powered Blog"
      },
      {
        author: "Jan Kowalski",
        content:
          "Problemy z zadłużeniem chińskich korporacji są w ogromnej mierze pokłosiem chińsko-amerykańskiej wojny handlowej. Jeżeli światowa gospodarka jeszcze trochę spowolni, ich problemy z zadłużeniem się pogłębią – ostrzega Mark Zandi, o czym informuje serwis Next.Gazeta.",
        keyWords: "china, money",
        title: "Rosną długi chińskich korporacji. To problem całego świata"
      },
      {
        author: "Mateusz Kowalski",
        content:
          "Święta za pasem, a wraz z ich przyjściem zaczyna się gorączka zakupów. Jak sobie radzić z tak dużymi wydatkami skoro z roku na rok wszystko drożeje, a średnia pensja podniosła się o tyle co nic? Grudzień co roku zbiera potężne żniwa w postaci chwilówek i pożyczek, a kredyty gotówkowe idą w tym czasie w odstawkę.",
        keyWords: "money, christmas",
        title: "Święta zasypią nas chwilówkami. Kredyty idą w odstawkę"
      }
    ];

    await articles.map(async a => {
      let article = new Article();
      article.author = a.author;
      article.content = a.content;
      article.keyWords = a.keyWords;
      article.title = a.title;

      await articleRepository.save(article, { reload: true });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}

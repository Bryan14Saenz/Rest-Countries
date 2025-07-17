$(function () {
  const getData = () => {
    return $.ajax({
      url: "../json/data.json",
      dataType: "json",
    });
  };

  getData().then((data) => {
    const countries = data.map((country) => {
      return {
        name: country.name,
        population: country.population,
        region: country.region,
        capital: country.capital,
        flag: country.flags.png,
      };
    });

    countries.forEach((country) => {
      const countryCard = `
        <div class="max-w-sm country-card mb-4 p-4 rounded-sm shadow bg-white">
          <img src="${country.flag}" alt="${country.name}">
          <h2 class="text-center font-black text-lg my-4">${country.name}</h2>
          <p><b>Population:</b> ${country.population}</p>
          <p><b>Region:</b> ${country.region}</p>
          <p><b>Capital:</b> ${country.capital}</p>
        </div>
      `;
      $("#countries").append(countryCard);
    });
  });

  $("#search").on("input", function () {
    const value = $(this).val();
    $(".country-card").hide();
    $(".country-card")
      .filter(function () {
        return $(this).text().toLowerCase().includes(value.toLowerCase());
      })
      .show();
  });

  $("#selectRegion").on("change", function () {
    const region = $(this).val();

    $(".country-card").hide();

    if (region === "All") {
      $(".country-card").show();
    } else {
      $(".country-card")
        .filter(function () {
          return $(this).text().toLowerCase().includes(region.toLowerCase());
        })
        .show();
    }
  });

  $("#mode-color").on("click", function () {
    const mode = $(this).find("img").attr("src");

    if (mode === "assets/svg/moon.svg") {
      $(this).find("img").attr("src", "assets/svg/sun.svg");
      $(this).find("span").text("Light Mode");
    } else {
      $(this).find("img").attr("src", "assets/svg/moon.svg");
      $(this).find("span").text("Dark Mode");
    }

    $("body").toggleClass("!bg-black");
    $("#header").toggleClass("!bg-gray-800 !text-white");
    $("#search").toggleClass("!bg-gray-800 !text-white !border-gray-800");
    $("#selectRegion").toggleClass("!bg-gray-800 !text-white !border-gray-800");
    $(".country-card").toggleClass("!bg-gray-800 !text-white");
  });
});

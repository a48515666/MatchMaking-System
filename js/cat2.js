/*side bar */
function openSlideMenu() {
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
}

function closeSlideMenu() {
    document.getElementById('side-menu').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
}

/* json array*/
const chinesefood = [{
        name: "川．一品鍋",
        address: "桃園市中壢區五興路416號",
        tel: "4204258",
        photo: "img/中式/一品鍋.jpg"
    },

    {
        name: "傻師傅湯包",
        address: "桃園市中壢區五興街331巷28號",
        tel: "4906763",
        photo: "img/中式/傻師傅.jpg"
    },
    {
        name: "白胡子牛排館",
        address: "桃園市平鎮區中央路133號",
        tel: " 4200937",
        photo: "img/中式/白胡子.jpg"

    },
    {
        name: "香城燒臘小館",
        address: "桃園市中壢區五興路331巷2號",
        tel: " 4205102",
        photo: "img/中式/香城.jpg"

    }

];

function Template(cstore) {
    return `
      <div class="item">
      <img class="photo" src="${cstore.photo}">
      <h2 class="store-name">${cstore.name}</h2>
      <span class="adr">${cstore.address}</span><br>
      <i class="fas fa-phone"></i><span class="tel"><a href="tel:+886-3-${cstore.tel}">03-${cstore.tel}</a></span>
      
      </div>
    `;
}

document.getElementById("chinese").innerHTML = `

    ${chinesefood.map(Template).join("")}

`;

$(function() {
    /* 按下GoTop按鈕時的事件 */
    $('#gotop').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 'slow'); /* 返回到最頂上 */
        return false;
    });

    /* 偵測卷軸滑動時，往下滑超過100px就讓GoTop按鈕出現 */
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#gotop').fadeIn();
        } else {
            $('#gotop').fadeOut();
        }
    });
});
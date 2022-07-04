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
const snack = [{
        name: "鬼島手作炭烤漢堡",
        address: "桃園市中壢區五興路345號",
        tel: "89028719",
        photo: "img/宵夜/鬼島.jpg"
    },

    {
        name: "無敵蛋餅",
        address: "桃園市中壢區五興路347號",
        tel: "28210319",
        photo: "img/宵夜/蛋餅.jpg"
    },
    {
        name: "霸王香雞排",
        address: "桃園市中壢區五興路390號",
        tel: "31806588",
        photo: "img/宵夜/霸王.jpg"

    }

];

function Template(cstore) {
    return `
      <div class="item">
      <img class="photo" src="${cstore.photo}">
      <h2 class="store-name">${cstore.name}</h2>
      <span class="adr">${cstore.address}</span><br>
      <i class="fas fa-phone"></i><span class="tel"><a href="tel:+886-9-${cstore.tel}">09-${cstore.tel}</a></span>
      
      </div>
    `;
}

document.getElementById("snack").innerHTML = `

    ${snack.map(Template).join("")}

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
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
const western = [{
        name: "Daddy's．美式餐廳",
        address: "桃園市中壢區中央路170號",
        tel: "4905052",
        photo: "img/西式/daddy.jpg"
    },

    {
        name: "麥克小姐",
        address: "桃園市中壢區中央路145號",
        tel: "4205038",
        photo: "img/西式/麥克.jpg"
    },
    {
        name: "馬爾波咖啡",
        address: "桃園市中壢區中央路178號",
        tel: "4900113",
        photo: "img/西式/馬爾波.jpg"

    },
    {
        name: "迷路義麵屋",
        address: "桃園市中壢區中央路151號",
        tel: "420 2713",
        photo: "img/西式/迷路.jpg"

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

document.getElementById("western").innerHTML = `

    ${western.map(Template).join("")}

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
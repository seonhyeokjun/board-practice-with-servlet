require(
    [
        'jquery',
        'ajax',
        'stache!/view/BoardList',
        'stache!/view/BoardItem'
    ],
    function ($, ajax, boardList, boardItem) {
        $(function () {
            $('body').append(boardList());
            $('#navbarSupportedContent button').on('click', function () {
                getList()
            })
            getList();
            sortTable();

            // 조회기능
            $('.count').on('click', function () {
                var count = $('.hit').html();
                var hit = parseInt(count);

            })

            // 검색기능
            $('#search').on('keyup', function () {
                let value = $(this).val().toLowerCase();
                console.log(value);
                $("#table tbody tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                })
            })
        })
        // List 가져오기
        function getList(){
            $('#table tbody').html(boardItem({maps: JSON.parse(ajax({ action: 'read' }))}));
        }

        // 게시판 오름차순 정렬
        function sortTable() {
            var table, rows, switching, i, x, y, shouldSwitch;
            // table = document.getElementById("table");
            table = $('#table')[0];
            switching = true;
            while (switching) {
                switching = false;
                rows = table.rows;
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[0];
                    y = rows[i + 1].getElementsByTagName("TD")[0];
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        }
    }
)
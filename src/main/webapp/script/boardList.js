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
        })

        function getList(){
            $('#table tbody').html(boardItem({maps: JSON.parse(ajax({ action: 'read' }))}));
        }
    }
)

function setProperty (ori, target) {
    if (typeof ori !== 'object' || typeof target !== 'object') return false
    return Object.assign({}, ori || {}, target)
}
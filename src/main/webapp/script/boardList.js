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
                var params = null;
                params = setProperty(params, {
                    action: $(this).attr('id')
                })

                $('input').each(function () {
                    console.log('key:', $(this).attr('id'), 'val:', $(this).val())
                    params = setProperty(params, {
                        [$(this).attr('id')]: $(this).val()
                    })
                })

                var i = ajax(params);
                console.log(JSON.parse(i));
                $('#table tbody').html(boardItem({maps: JSON.parse(i)}));
            })
        })
    }
)

function setProperty (ori, target) {
    if (typeof ori !== 'object' || typeof target !== 'object') return false
    return Object.assign({}, ori || {}, target)
}
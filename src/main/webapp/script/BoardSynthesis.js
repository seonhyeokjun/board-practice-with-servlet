require([
    'jquery',
    'ajax',
    'common',
    'stache!/view/BoardView',
    'stache!/view/BoardItem'
], function ($, ajax, common, boardView, boardItem) {
    const state = window.location.search.length > 0 ? 'update' : 'create'

    $('body').append(boardView())
    $('button').on('click', function () {
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
        $('#table').html(boardItem({maps: JSON.parse(i)}));
    })

    if (state === 'update') {
        const keys = ['sequence', 'title', 'contents']
        keys.forEach(key => setValue(key))
    }

    function setValue (key) {
        $(`#${key}`).attr('readonly', true)
        $(`#${key}`).val(common.getParameterByName(key))
    }
})

function setProperty (ori, target) {
    if (typeof ori !== 'object' || typeof target !== 'object') return false
    return Object.assign({}, ori || {}, target)
}

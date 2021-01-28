require([
    'jquery',
    'ajax',
    'common',
    'stache!/view/BoardView',
    'stache!/view/BoardItem',
    'stache!/view/Button'
], function (
    $,
    ajax,
    common,
    boardView,
    boardItem,
    boardButton
) {
    var state = window.location.search.length > 0 ? 'update' : 'create'
    var length = window.location.search.length

    $('body').append(boardView())
    $('#button_box').prepend(boardButton({
        length : length
    }))
    $('#modified').on('click', function (e) {
        $('#title').attr('readonly', false);
        $('#contents').attr('readonly', false);
        e.preventDefault();
    })
    $('#button_box button').on('click', function () {
        let params = null;
        params = setProperty(params, {
            action: $(this).attr('id')
        })
        $('input').each(function () {
            console.log('key:', $(this).attr('id'), 'val:', $(this).val())
            params = setProperty(params, {
                [$(this).attr('id')]: $(this).val()
            })
        })
        let boardData = ajax(params);
        $('#table').html(boardItem({maps: JSON.parse(boardData)}));
    })
    if (state === 'update') {
        ajax({action: 'detail', sequence:common.getParameterByName('sequence')});
        ['sequence', 'title', 'contents'].forEach(key => setValue(key))
    }

    function setValue (key) {
        let selector = $(`#${key}`);
        selector.attr('readonly', true)
        selector.val(common.getParameterByName(key))
    }
    function setProperty (ori, target) {
        if (typeof ori !== 'object' || typeof target !== 'object') return false
        return Object.assign({}, ori || {}, target)
    }
})
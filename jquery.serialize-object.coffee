do ($=jQuery) ->

  $.fn.serializeObject = ->
    
    json = {}
    push_counters = {}
    patterns =
      validate  : /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
      key       : /[a-zA-Z0-9_]+|(?=\[\])/g,
      push      : /^$/,
      fixed     : /^\d+$/,
      named     : /^[a-zA-Z0-9_]+$/

    @build = (base, key, value) ->
      base[key] = value
      base

    @push_counter = (key, i) ->
      push_counters[key] = 0 if push_counters[key] is undefined
      if i is undefined
        push_counters[key]++
      else if i > push_counters[key]
        push_counters[key] = ++i

    $.each $(@).serializeArray(), (i, elem) =>
      return unless patterns.validate.test(elem.name)

      keys = elem.name.match patterns.key
      merge = elem.value
      reverse_key = elem.name

      while (k = keys.pop()) isnt undefined

        re = new RegExp("\\[#{k}\\]$")
        reverse_key = reverse_key.replace re, ''

        if patterns.push.test k 
          merge = @build [], @push_counter(reverse_key), merge

        else if patterns.fixed.test k 
          @push_counter(reverse_key, k)
          merge = @build [], k, merge

        else if patterns.named.test k
          merge = @build {}, k, merge

      json = $.extend true, json, merge

    return json
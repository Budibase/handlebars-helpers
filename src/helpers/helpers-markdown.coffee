
module.exports.register = (Handlebars, options) ->

  Utils      = require '../utils/utils'
  _ = require 'lodash'

  opts =
    gfm: true
    highlight: 'auto'

  opts = _.extend opts, options

  markdown   = require('../utils/markdown').Markdown opts

  isServer = (typeof process isnt 'undefined')

  ###
  Markdown

  Markdown helper used to write markdown inside and
  rendered the markdown inline with the HTML

  Usage:

  {{#markdown}}
  # This is a title.
  {{/markdown}}

  Renders to:
  <h1>This is a title </h1>
  ###
  Handlebars.registerHelper "markdown", (options) ->
    content = options.fn(this)
    markdown.convert content

  if isServer

    ###
    Markdown helper used to read in a file and inject
    the rendered markdown into the HTML.

    Usage:

    {{md ../path/to/file.md}}
    ###
    Handlebars.registerHelper "md", (path) ->
      content = markdown.read(path)
      content


  @
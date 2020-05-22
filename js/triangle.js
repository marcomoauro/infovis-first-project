let margin = { top: 20, right: 20, bottom: 30, left: 40 }
let width = 1920 - margin.left - margin.right
let height = 1080 - margin.top - margin.bottom
let stroke = 'black'
let strokeWidth = '2'

let createSvg = () =>
  d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

let drawTriangles = (svg, data) => data.forEach(element => drawTriangle(svg, element))

let drawTriangle = (svg, element) => {
  let height = triangleHeight(element.sides_length, element.base_length)
  let topX = element.horizontal_position, topY = element.vertical_position
  let downRightX = topX + element.base_length / 2, downRightY = topY + height
  let downLeftX = downRightX - element.base_length, downLeftY = topY + height

  // path use to fill color
  svg.append('path')
    .attr('d', d => {
      return 'M ' + topX + ' ' + topY + ' L ' + downRightX + ' ' + downRightY + ' L ' + downLeftX + ' ' + downLeftY + ' L ' + topX + ' ' + topY
    })
    .attr('fill', 'red')

  // path lines
  svg.append('path')
    .attr('d', d => {
      return 'M ' + topX + ' ' + topY + ' L ' + downRightX + ' ' + downRightY
    })
    .attr('stroke', stroke)
    .attr('stroke-width', strokeWidth)

  svg.append('path')
    .attr('d', d => {
      return 'M ' + downRightX + ' ' + downRightY + ' L ' + downLeftX + ' ' + downLeftY
    })
    .attr('stroke', stroke)
    .attr('stroke-width', strokeWidth)

  svg.append('path')
    .attr('d', d => {
      return 'M ' + downLeftX + ' ' + downLeftY + ' L ' + topX + ' ' + topY
    })
    .attr('stroke', stroke)
    .attr('stroke-width', strokeWidth)
}

let triangleHeight = (sides_length, base_length) =>
  Math.sqrt(Math.pow(sides_length, 2) - Math.pow(base_length / 2, 2))

d3.json("data/triangles.json")
  .then(data => {

    let svg = createSvg()
    drawTriangles(svg, data)



  })
  .catch(error => {
    console.log(error)
  })
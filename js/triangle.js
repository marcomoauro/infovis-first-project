let margin = { top: 20, right: 20, bottom: 30, left: 40 }
let width = 1920 - margin.left - margin.right
let height = 1080 - margin.top - margin.bottom

let drawTriangle = (svg, element) => {
  svg.append('path')
    .attr('d', d => {
      let x = element.horizontal_position, y = element.vertical_position
      let h = Math.sqrt(Math.pow(element.sides_length, 2) - Math.pow(element.base_length / 2, 2))
      return 'M ' + x + ' ' + y + ' l ' + element.base_length / 2 + ' ' + h + ' h ' + -element.base_length + ' z'
    })
}

d3.json("data/triangles.json")
  .then(data => {

    let svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    data.forEach(element => drawTriangle(svg, element))



  })
  .catch(error => {
    console.log(error)
  });
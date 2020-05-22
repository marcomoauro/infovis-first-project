let margin = { top: 20, right: 20, bottom: 30, left: 40 }
let width = 1920 - margin.left - margin.right
let height = 1080 - margin.top - margin.bottom
let lineStroke = 'black'
let lineWidth = '5'

d3.json("data/triangles.json")
  .then(dataset => {

    let createSvg = () =>
      d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    let drawTriangles = (svg, dataset) => {
      let groups = svg.selectAll('g').data(dataset)

      groups.exit().remove()

      let group = groups.enter()
        .append('g')

      group.append('path')
        .attr('d', element => trianglePath(element))
        .attr('fill', element => element.hue)

      group.append('line')
        .attr('x1', element => topX(element))
        .attr('y1', element => topY(element))
        .attr('x2', element => downRightX(element))
        .attr('y2', element => downRightY(element))
        .attr('stroke', lineStroke)
        .attr('stroke-width', lineWidth)
        .attr('stroke-linecap', "round")
        .on('click', click)

      group.append('line')
        .attr('x1', element => downRightX(element))
        .attr('y1', element => downRightY(element))
        .attr('x2', element => downLeftX(element))
        .attr('y2', element => downLeftY(element))
        .attr('stroke', lineStroke)
        .attr('stroke-width', lineWidth)
        .attr('stroke-linecap', "round")
        .on('click', click)

      group.append('line')
        .attr('x1', element => downLeftX(element))
        .attr('y1', element => downLeftY(element))
        .attr('x2', element => topX(element))
        .attr('y2', element => topY(element))
        .attr('stroke', lineStroke)
        .attr('stroke-width', lineWidth)
        .attr('stroke-linecap', "round")
        .on('click', click)
    }

    let click = d => {
      let newDataset = dataset.map(element => {
        return {
          'horizontal_position': element.base_length,
          "vertical_position": element.vertical_position,
          "base_length": d.horizontal_position,
          "sides_length": element.sides_length,
          "hue": element.hue
        }
      })
      drawTriangles(svg, newDataset)
    }

    let trianglePath = element => {
      let height = triangleHeight(element.sides_length, element.base_length)
      let topX = element.horizontal_position, topY = element.vertical_position
      let downRightX = topX + element.base_length / 2, downRightY = topY + height
      let downLeftX = downRightX - element.base_length, downLeftY = topY + height

      return 'M ' + topX + ' ' + topY + ' L ' + downRightX + ' ' + downRightY + ' L ' + downLeftX + ' ' + downLeftY + ' L ' + topX + ' ' + topY
    }

    let topX = element => element.horizontal_position
    let topY = element => element.vertical_position
    let downRightX = element => topX(element) + element.base_length / 2
    let downRightY = element => topY(element) + triangleHeight(element.sides_length, element.base_length)
    let downLeftX = element => downRightX(element) - element.base_length
    let downLeftY = element => downRightY(element)
    let triangleHeight = (sides_length, base_length) => Math.sqrt(Math.pow(sides_length, 2) - Math.pow(base_length / 2, 2))

    let svg = createSvg()
    drawTriangles(svg, dataset)

  })
  .catch(error => {
    console.log(error)
  })
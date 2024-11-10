function experiment(pillars, setPillars){

   const newPillars = [...pillars]
   let a = newPillars[0]
   let b = newPillars[4]
   newPillars[4] = a
   newPillars[0] = b

   setPillars(newPillars)
}

export default experiment
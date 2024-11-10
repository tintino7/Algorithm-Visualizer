import { motion } from "framer-motion";


function Pillar({id, className, height}){
    const springAnim = {
        type: "spring",
        damping: 20,
        stiffness: 300
    };

    return (
        <motion.div 
            id={id} 
            className={className} 
            layout transition={springAnim}
            style={{height : height}}
            > 
            {height}
        </motion.div>
    )
}

export default Pillar
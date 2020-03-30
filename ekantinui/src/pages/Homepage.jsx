import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 480,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: "auto",
    marginRight: "auto"
  },
  toTopButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.toTopButton}>
        {children}
      </div>
    </Zoom>
  );
}

export default function Homepage(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.container}>
        <Toolbar id="back-to-top-anchor" />
        <h1>Homepage</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, aperiam est molestias provident libero placeat a,
          sequi reprehenderit quos deleniti sit quo necessitatibus culpa corrupti incidunt quod, maiores iusto facilis odio
          officiis laboriosam! Minus veritatis molestiae, corporis velit quis soluta nostrum exercitationem, aliquam inventore
          culpa nihil error praesentium eaque odio magnam! Eveniet modi neque vero! Vero ad quidem, aliquid facere, similique
          harum, iusto aliquam vitae numquam asperiores possimus ipsam saepe autem eum mollitia esse repudiandae doloremque.
          Officiis omnis tenetur commodi quisquam at dolore molestiae quo? Dicta, recusandae provident? Soluta commodi quaerat,
          non ducimus modi ipsa tempore officia perferendis repellat inventore.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum dolore quibusdam aspernatur, totam voluptate nemo! Culpa
          laudantium magnam nemo tempora doloribus ad! Eius, pariatur dolorem? Numquam maxime aperiam, laboriosam dolor in rerum
          illum nobis? Cum ipsa veritatis atque dolorum natus? Accusamus in consectetur totam enim? Facilis, alias aliquam
          assumenda eum, dolorem tempore voluptatum exercitationem autem, temporibus suscipit perferendis non consectetur quaerat
          saepe eius quam velit odit modi repellat eligendi ea. Ut incidunt minima eaque a delectus praesentium ipsam, culpa, est
          quibusdam, sit porro excepturi. Unde temporibus itaque, blanditiis nesciunt incidunt nam dolor, libero non atque
          voluptatum quaerat reprehenderit. Vitae consequatur id facere debitis expedita tenetur blanditiis architecto, adipisci
          quam fugit sapiente necessitatibus, ex autem atque eum nesciunt obcaecati quo laborum dolores assumenda? Magnam libero
          quaerat modi animi reiciendis tenetur ipsa veritatis mollitia id numquam repellat assumenda aliquid cupiditate nihil,
          aliquam cumque iure alias quod esse blanditiis. Repudiandae maxime cum sint repellat minima officiis veritatis et
          distinctio minus. Iste quod vel doloremque molestiae animi sit nisi autem ea quasi quas expedita iure voluptates amet,
          facilis eius asperiores at sapiente? Exercitationem, atque ipsum beatae laudantium tempora in perferendis libero commodi
          praesentium distinctio, similique laboriosam inventore omnis rerum facere eius excepturi deserunt sed odit. Qui eligendi
          suscipit eaque consequatur quos consectetur praesentium laborum, molestias, nemo saepe deleniti amet voluptatum fugit
          sunt temporibus et, totam vel exercitationem dolor hic dolorum. Voluptatem rem iure veritatis exercitationem repellat
          nihil quis ratione earum ut quod, numquam deserunt, officia adipisci quas dignissimos dicta ab nobis ducimus quidem
          dolor delectus, quaerat rerum! Ut veniam, unde fugiat eos, delectus doloribus doloremque quis aliquam, esse similique
          saepe dicta nihil ipsa optio voluptas magni harum dolore! Quibusdam possimus, provident ad nulla quaerat distinctio
          delectus odio soluta nihil animi laudantium minima, tenetur commodi rerum nesciunt accusantium nemo, adipisci beatae
          vitae facilis dolores impedit deleniti deserunt! Minus voluptates laudantium odio animi soluta, expedita ad non
          necessitatibus minima, at ducimus officiis iste nihil? Sequi quos tenetur excepturi ex enim nulla voluptates! Laudantium
          hic quaerat exercitationem at explicabo asperiores laboriosam repellendus iusto dolores ratione, ab harum enim
          consequuntur illum aspernatur. Obcaecati culpa suscipit assumenda qui hic voluptatum velit iusto repellat iure dolor
          reprehenderit quae nemo accusantium modi voluptatem, deserunt alias repudiandae veniam quos voluptate maxime
          perspiciatis accusamus dolores sed. Facilis, quae dolores mollitia rem delectus harum esse vel facere ut? Dolorem nam
          cupiditate, asperiores deserunt sapiente accusamus minus rerum eos fugit officia rem dolorum ab placeat obcaecati nulla
          facere vero omnis numquam voluptas veritatis quod. Necessitatibus ex nam nulla dolorem distinctio nihil ducimus minus
          reiciendis magni, porro perferendis commodi fuga eveniet earum illum corporis optio? Ipsam voluptatibus rem ducimus
          eveniet ullam odit necessitatibus accusamus quod excepturi dolore, debitis quisquam, pariatur error. Rerum nemo
          provident alias saepe magni voluptatum quaerat nobis excepturi modi id consequuntur iste necessitatibus, nulla vitae
          corrupti. Eius corporis excepturi, natus veniam facilis id, consequatur fugit officiis nobis, molestiae odio sint
          debitis corrupti nisi at optio quisquam deleniti voluptates quaerat accusantium qui adipisci. Velit ipsum laboriosam
          quod atque iusto reprehenderit asperiores voluptate sequi sit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores alias quidem culpa cupiditate minima dolorum amet
          aliquam magni, natus, repellendus animi minus aliquid blanditiis. Magnam quos labore alias cumque facilis qui eos, non
          ducimus? Distinctio accusamus deserunt ab hic repellat, error tempore velit dolore, ut explicabo similique facere, quod
          fuga asperiores aliquam voluptatibus. Assumenda quam dolorum nisi unde eius sit voluptatem, facilis quos eum quidem
          quibusdam expedita amet nihil modi veniam porro alias sed exercitationem? Atque modi rerum tempora iste doloremque.
          Beatae, natus doloremque accusamus molestias recusandae distinctio. Sapiente molestias adipisci dignissimos nulla libero
          animi exercitationem, maxime quo. Vero minima quisquam modi rerum consectetur aut eveniet incidunt atque, quae natus
          laborum ratione impedit omnis quas debitis deleniti. Voluptate aspernatur doloribus veritatis ea sequi mollitia
          praesentium error laudantium facilis quo alias perspiciatis, ipsum placeat repudiandae facere aliquam architecto iure
          enim culpa quod accusamus, rem accusantium quaerat. Unde voluptatibus ratione molestiae aut voluptas deserunt et beatae,
          earum tempora dolor quisquam, ad velit qui quis, pariatur ex asperiores neque. Reiciendis quas dicta, est maxime cumque
          fugiat mollitia neque harum et! Aspernatur debitis inventore quisquam itaque modi cupiditate excepturi perspiciatis
          soluta animi cumque, adipisci minima magnam quidem illo facere porro, hic molestiae error sequi fugiat, explicabo minus
          veniam. Itaque vel nihil cupiditate sint fugit veniam, cum aspernatur ut laborum aut debitis placeat? Provident pariatur
          debitis aspernatur aperiam in impedit corporis. Facilis aliquid pariatur cum nam accusantium facere id, nemo mollitia
          sequi nihil voluptate eos doloribus adipisci exercitationem, error aspernatur! Omnis modi id consectetur at maxime,
          explicabo nulla assumenda officia? Dolor consequuntur reprehenderit laboriosam adipisci earum quisquam atque neque
          consequatur nam illo ipsa veritatis possimus soluta architecto deleniti nihil doloribus nesciunt repellendus sed
          nostrum, autem illum odit ratione? Temporibus non libero magnam animi reiciendis totam iure ipsa quam, nisi ab quibusdam
          accusamus. Reprehenderit explicabo ea tempore voluptatibus dolores laborum nihil modi? Vero vel velit ipsam. Non
          voluptates blanditiis incidunt optio eveniet ipsa velit quasi, eaque autem tenetur repellendus quia magnam, ducimus
          cupiditate vero quam, alias perspiciatis error fuga similique. Provident, qui inventore, repudiandae pariatur maiores
          unde quisquam porro, vel consequatur dolor sed ipsa consequuntur. Eos vitae, delectus aliquid inventore ullam impedit.
          Molestiae provident magnam placeat quia odio, nesciunt dolorum voluptatum maxime suscipit ea iusto, repellat libero
          aperiam ad rerum odit pariatur labore veniam quod, autem sapiente delectus laboriosam non consectetur? Delectus dolor,
          voluptates facilis saepe veniam earum laboriosam rerum commodi eos optio ut, nostrum maxime amet temporibus tempora
          dicta aut laborum quod rem itaque recusandae sapiente iure. Eos a libero tempora dolorem expedita deleniti, provident
          eius molestias architecto quisquam natus facilis ab voluptates possimus facere placeat fuga repellat itaque corporis
          sequi minus! Adipisci aperiam dolore iure repellat qui sed numquam voluptatum vero? Dolor, voluptatem, rem ipsa qui
          omnis ex amet maxime voluptas sequi reiciendis, saepe obcaecati dolorem labore optio quas totam enim hic doloribus
          veniam tempora est blanditiis doloremque beatae ea? Blanditiis officiis dicta soluta reiciendis, natus cumque
          consectetur illo autem dolore ad laboriosam a ab provident. At iure molestias voluptatem, voluptate praesentium itaque
          aliquid.
        </p>
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </div>
    </Fragment>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired
};

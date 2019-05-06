import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

const tablecontent = (
    <>
                    <thead>
						<tr>
							<th>#</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Username</th>
							<th>#</th>
							<th>Description</th>
							<th>Description 1</th>
							<th>Description 2</th>

						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
							<th>1</th>
							<th>The sentance starts here</th>
							<th>The sentance starts here</th>
							<th>The sentance starts here</th>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
							<th>2</th>
							<th>The sentance starts here</th>
							<th>The sentance starts here</th>
							<th>The sentance starts here</th>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td>Larry</td>
							<td>the Bird</td>
							<td>@twitter</td>
							<th>3</th>
							<th>The sentance starts here</th>
							<th>The sentance starts here</th>
							<th>The sentance starts here</th>
						</tr>
						<tr>
							<th scope="row">4</th>
							<td>David</td>
							<td>Bullock</td>
							<td>@serkai</td>
							<th>4</th>
							<th>The sentance starts here</th>
							<th>The sentance starts here</th>
							<th>The sentance starts here</th>
						</tr>
					</tbody>
                    </>
);


const style = {
    "col-2": {
        overflow : 'hidden' // added code
    },
    "center-block": {
        overflow : 'auto' // added code
    },
    table: {
        marginBottom: '0',
        maxWidth: 'none',
        width: '100%',
        minWidth:'900px', // added code
        overflow:'hidden',	// added code
    },
    
    panel: {
        padding: '15px',
        display: 'flex',
    },
    
    "col-1": {
        minWidth: '200px',
        maxWidth: '220px',
    },
    
    "col-2": {
        width: '100%',
    },
    
    // Scrollbar Override
    "scroll-inner": {
        overflowY: 'hidden',
        overflowX: 'auto',
        width: '100%',
    },
    
    body: {
        backgroundColor: 'tint(cornflowerblue, 60%)' // because fight club
    },
    
};

function TestTable({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <div class="container">
	<h1 class="text-center">Table Overflow-X Scroll</h1>
	<div class="panel panel-default">
		<div class="col-1">Column 1 Column ColumnColu mnColumnC olumn</div>
		<div class="col-2">
			<div class="center-block scroll-inner">
				<table class="table table-striped">
					{tablecontent}
				</table>
			</div>
		</div>
	</div>
</div>
  );
}

export default withStyles(style)(TestTable);

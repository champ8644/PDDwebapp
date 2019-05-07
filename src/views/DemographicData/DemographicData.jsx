import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardAvatar from 'components/Card/CardAvatar.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import HNInput from 'components/CustomInput/HNInput.jsx';
import MedicationTable from 'views/DemographicData/MedicationTable.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import UserInputs from 'views/DemographicData/UserInputs.jsx';
import avatar from 'assets/img/faces/switt.jpg';
import switt from 'assets/img/switt.gif';
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/core components

// core components

// import views

// import pictures

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  inputHN: {
    fontSize: '36px'
  }
};

function UserProfile(props) {
  const { classes } = props;
  return (
    <div style={{ marginTop: '0px' }}>
      <GridContainer loading>
        <GridItem xs={12} sm={6} md={5} lg={4}>
          <Card noTopMargin>
            <CardBody loading>
              <HNInput
                noMargin
                labelText='HN'
                id='HN'
                formControlProps={{
                  fullWidth: true,
                  margin: 'none',
                  className: classes.inputHN
                }}
                className={classes.inputHN}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <GridContainer direction='column'>
            <GridItem>
              <UserInputs />
            </GridItem>
            <GridItem style={{ maxWidth: '100%' }}>
              <MedicationTable />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href='#pablo' onClick={e => e.preventDefault()}>
                <img src={avatar} alt='...' />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Switt Kongdachalert</h4>
              <img width='100%' src={switt} alt='switt is excited' />
              <a href='https://www.facebook.com/swittk/'>
                <Button color='primary' round>
                  Follow
                </Button>
              </a>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

UserProfile.propTypes = {
  classes: PropTypes.any
};

export default withStyles(styles)(UserProfile);

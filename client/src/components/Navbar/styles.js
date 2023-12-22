import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px'
    },
    title: {
        color: '#0b3d91',
        textDecoration: 'none'
    },
    logo: {
        marginLeft: '15px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px'
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px'
    },
    userName: {
        display: 'flex',
        alignItems: 'center'
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center'
    }
}));
import React from 'react';
import {TopNarBar} from '../topnavbar';
import {Button, Grid} from '@material-ui/core';
import './new_post.css'
import './react_tag.css'
import {AddTags} from './addTags';
import {StyledMenus} from './styled_menu';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import {ListItemIcon,ListItemText}  from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FilterNoneIcon from '@material-ui/icons/FilterNone';

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#b7cfe0',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.black
      },
    },
  },
}))(MenuItem);

type State={
  tags:any, 
  suggestions:any, 
  anchorEl:any,
  img_upload_src:any | undefined
}

export class New_Post extends React.Component<{},State> {

    constructor(props:any) {
      super(props);
      const val = {id:1, name:"apple", disabled: true}
      this.state = {
        tags: [],
        suggestions: [
          { id: 0, name: "Laravel" },
          { id: 1, name: "React" },
          { id: 2, name: "MongoDB" }
        ],
        anchorEl: null,
        img_upload_src: undefined
      };
    }
  
    handleOpen = (event:any) => {
      this.setState({anchorEl:event.currentTarget});
    };
  
    handleClose = (event:any) => {
      this.setState({anchorEl:null})
    };

    
    handleDelete(i:any) {
      const tags = this.state.tags.slice(0);
      tags.splice(i, 1);
      this.setState({ tags:[...tags] });
    }
  
    handleAddition(tag:any) {
      if(this.state.tags.length>=5) return;
      const tags = [].concat(this.state.tags, tag);
      this.setState({ tags })
      if(!this.state.suggestions.includes(tag)){
        const suggestions = [].concat(this.state.suggestions, tag);
        this.setState({ suggestions });
      }
    }

    image_upload_button = ( ) =>(
      <Grid container item sm={12}>
          <Grid item sm={2} xs={12}>
              <img src="/storage/base/map.png" width='100%' height='100%'/>    
          </Grid>
          <Grid item sm={10} xs={12}>
              <div className="pl-sm-2" style={{paddingTop:'12px'}}>
                 {this.dropdown_menu_button()}
              </div>
          </Grid>
      </Grid>
    )

    changeUploadImg(e:any){
      let _file = e.target.files[0]
      let reader = new FileReader();

      reader.readAsDataURL(_file);

      reader.onloadend = () => {
          this.setState({ img_upload_src: _file.name})
          console.log(this.state.img_upload_src)
      };
    }

    dropdown_menu_button = () => (
      <>
        <Button variant="contained" className="addPic-btn"  onClick = {this.handleOpen.bind(this)}>写真を選択</Button>
        <StyledMenus anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onClose={this.handleClose.bind(this)}>
              <StyledMenuItem>
                <ListItemText primary="フォトライブラリ"  />
                <ListItemIcon><FilterNoneIcon fontSize="medium" /></ListItemIcon>
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemText primary="写真を撮る" />
                <ListItemIcon><CameraAltIcon fontSize="medium" /></ListItemIcon>
              </StyledMenuItem>
              <label htmlFor="img-upload" style={{width:'100%'}}  onClick={this.handleClose}>
                  <StyledMenuItem>
                        <ListItemText primary="ブラウズ" />
                        <ListItemIcon><MoreHorizIcon fontSize="medium" /></ListItemIcon>
                  </StyledMenuItem>
              </label>
        </StyledMenus>
      </>
    )
  
    render() {
      return (
        <>
         <TopNarBar title="LOGO"/>
            <div className="new-body">
                <div className="p-20">
                    <label className="form-label" >画像（最大10枚）</label>
                    {  this.state.img_upload_src!=null? this.image_upload_button() : this.dropdown_menu_button() }
                    <input accept="image/*" id="img-upload" type="file" onChange={this.changeUploadImg.bind(this)}/>
                </div>
                <div className="p-20">
                    <label className="form-label" htmlFor="msg-input">本文（最大1000文字）</label>
                    <textarea className=" post-text form-control" id="msg-input" rows = {7} name="msg"/>
                </div>
                <div className="p-20" style={{zIndex: 10}}>
                    <label className="form-label" htmlFor="tag-input">タグ（最大5つ）</label>
                    <AddTags  tags={this.state.tags} suggestions={this.state.suggestions}  
                      onDelete={this.handleDelete.bind(this)}  
                      onAddition={this.handleAddition.bind(this)}/>
                </div>
                <div className="p-20">
                    <button className="collect-btn" >投稿する</button>
                </div>
            </div>
        </>
      );
    }
  }
  

  
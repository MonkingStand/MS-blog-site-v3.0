import React    from 'react';
import { Link } from 'react-router';

class DirectoryItem extends React.Component {
    constructor() {
        super();
        this.changePaper = this.changePaper.bind(this);
    };

    changePaper(paperId) {
        const { loadingContent, initPaper, initComments } = this.props;

        loadingContent();
        initPaper(paperId);
        initComments(paperId);
    };

    render() {
        const directoryItem = this.props.directoryItem;
        const itemId        = directoryItem.id;
        const param_title   = directoryItem.title;
        const text_title    = directoryItem.title;
        const text_tag      = !directoryItem.subtag ? directoryItem.tag : directoryItem.tag + '，' + directoryItem.subtag;
        const text_date     = directoryItem.date;
        const text_abstract = directoryItem.abstract;
        
        return (
            <div className = "category-item">
                <div className = "item-title">
                    <h2>
                        <Link 
                            to         = { '/paper?paperId=' + itemId }
                            title      = { param_title }
                            onClick    = { () => this.changePaper(itemId) }
                            data-hover = { param_title }
                        >
                            { text_title }
                        </Link>
                    </h2>
                </div>
                <div className = "item-subtitle">
                    <h3>
                        <span className = "subtitle-tags pull-left">
                            <i className = "fa fa-tags"></i>&nbsp;
                            <span className = "tags-val">{ text_tag }</span>
                        </span>
                        <span className = "subtitle-date">
                            <i className = "fa fa-calendar"></i>&nbsp;
                            <span className = "date-val">{ text_date }</span>
                        </span>
                    </h3>
                </div>
                <div className = "item-abstract">
                    <p>{ text_abstract }</p>
                </div>
            </div>
        );
    };
};

class UI_directoryItem extends React.Component {
    componentWillMount() {
        const { loadingAll } = this.props;

        loadingAll();
    };

    componentDidMount() {
        const { passState, directory, initDirectoryFilter, initDirectory } = this.props;

        if (initDirectory) {
            /* 筛选的目录和总目录复用的本组件，需判断一下 */
            initDirectory();
        }
        else {
            if (directory.length === 0) {
                initDirectoryFilter(passState.keyword, passState.keywordType);
            }
        }
    };

    render() {
        const { loadingContent, directory, initPaper, initComments } = this.props;

        return (
            <div 
                id = "paperContent" 
                className = "content-block" 
            >
                <div className = "paper-title">
                    <h1>Directory</h1>
                </div>
                <hr/>
                <div className = "paper-content">
                {
                    directory.map((directoryItem, directoryIndex) => {
                        return (
                            <DirectoryItem 
                                key            = { 'directoryKey_' + directoryIndex }
                                directoryItem  = { directoryItem } 
                                loadingContent = { loadingContent }
                                initPaper      = { initPaper }
                                initComments   = { initComments }
                            />
                        )
                    })
                }
                </div>
            </div>
        );
    };
};

export default UI_directoryItem;
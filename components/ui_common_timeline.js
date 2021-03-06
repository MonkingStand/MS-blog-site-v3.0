import React    from 'react';
import { Link } from 'react-router';

import PluginRoundAbout from '../modules/plugin_round_about';

class TimelineItem extends React.Component {
    constructor() {
        super();
        this.directoryFilter = this.directoryFilter.bind(this);
    };

    directoryFilter(keyword, keywordType) {
        const { loadingContent, initDirectoryFilter } = this.props;

        loadingContent();
        initDirectoryFilter(keyword, keywordType);
    };

    render() {
        const { timeline, papersCount } = this.props.timelineItem;

        return (
            <dd>
                <Link 
                    to      = {{
                        pathname:"/directoryFilter",
                        state   : {
                            keyword    : timeline,
                            keywordType: 'timeline'
                        }
                    }}
                    onClick = { () => this.directoryFilter(timeline, 'timeline') }
                >
                    <span className = "time-val">{ timeline }</span>
                    (<span className = "count">{ papersCount }</span>)
                </Link>
            </dd>
        );
    };
};

class UI_commonTimeline extends React.Component {
    componentWillMount() {
        const { loadingAll } = this.props;

        loadingAll();
    };

    componentDidMount() {
        const { initTimeline } = this.props;
        
        initTimeline();
    };

    render() {
        const { loadingContent, timeline, initDirectoryFilter } = this.props;

        return (
            <div className = "content-block">
                <dl 
                    id        = "timeList" 
                    className = "comm-dl"
                >
                    <a className = "content-icon">
                        <i className = "fa fa-history"></i>
                        &nbsp;
                    </a>
                    <dt id = "timeLineTitle">
                        Timeline<br/>
                        <PluginRoundAbout />
                    </dt>
                    {
                        timeline.map((timelineItem, timelineIndex) => {
                            return (
                                <TimelineItem
                                    key                 = { 'timelineKey_' + timelineIndex }
                                    timelineItem        = { timelineItem }
                                    loadingContent      = { loadingContent }
                                    initDirectoryFilter = { initDirectoryFilter }
                                />
                            );
                        })
                    }
                </dl>
            </div>
        );
    };
};

export default UI_commonTimeline;
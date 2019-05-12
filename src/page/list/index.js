import React from 'react';
import { Table, Modal, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import SampleChart from '../../components/SampleChart';
const namespace = 'cards';
const FormItem = Form.Item;

function mapStateToProps(state) {
    return {
        cardsList: state.cards.cardsList,
        cardsLoading: state.loading.effects[`${namespace}/queryList`],
        statistic: state.cards.statistic,
    };
}
class List extends React.Component {
    state = {
        visible: false,
        statisticVisible: false,
        id: null
    }
    componentDidMount() {
        this.props.dispatch({
            type: `${ namespace }/queryList`,
        })
    }
    columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '描述',
            dataIndex: 'desc',
        },
        {
            title: '链接',
            dataIndex: 'url',
            render: value => <a href={value}>{value}</a>
        },
        {
            title: '',
            dataIndex: 'statistic',
            render: (_, { id }) => {
                console.log('statistic id : ', id)
                return (
                    <Button onClick={() => { this.showStatistic(id); }}>图表</Button>
                )
            }
        }
    ];
    showStatistic = id => {
        this.props.dispatch({
            type: 'cards/getStatistic',
            payload: id
        });
        this.setState({ id, statisticVisible: true })
    }
    showModal = () => {
        this.setState({ visible: true});
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    };
    handleStatisticCancel = () => {
        this.setState({
            statisticVisible: false
        })
    }
    handleOk = () => {
        const { dispatch, form: { validateFields } } = this.props;

        validateFields((err, values) => {
            if(!err) {
                // console.log(' payload ', values);
                dispatch({
                    type: `${namespace}/addOne`,
                    payload: values
                });
                this.setState({ visible: false })
            }
        });
    }
    render() {
        // console.log('soda props ', this.props);
        // const { cardsList, cardsLoading, statistic } = this.props;
        const { visible, statisticVisible, id } = this.state;
        const { cardsList, cardsLoading, form: { getFieldDecorator }, statistic } = this.props;
        // console.log('datasource ', cardsList)
        console.log('statistic ', statistic);
        return (
            <div>
                <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
                <Button onClick={this.showModal}>新建</Button>
                <Modal 
                    title="新建记录" 
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <FormItem label="名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="描述">
                            {getFieldDecorator('desc')(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="链接">
                            {getFieldDecorator('url', {
                                rules: [{type: 'url'}],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
                    <SampleChart data={statistic[id]} />
                </Modal>
            </div>
        )
    }
}
export default connect(mapStateToProps)(Form.create()(List));
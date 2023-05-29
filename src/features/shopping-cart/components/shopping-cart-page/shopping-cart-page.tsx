import React, { useEffect, useState } from 'react';
import PageLayout from '../../../../common/components/page-layout/page-layout';
import './shopping-cart-page.scss';
import { Button, Card, Form, Input } from 'antd';
import GoodCartList from '../good-cart-list/good-cart-list';
import { selectCartGoods, selectCartGoodsTotalPrice, setCartGoodInitialState } from '../../slice/good-cart-list-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { useCreateOrderMutation } from '../../api/repository';
import { Order } from '../../api/models/cart-good.model';
import { toast } from 'react-toastify';
import { setGoodsInitialState } from '../../../shop/slice/good-list-slice';
import { useNavigate } from 'react-router-dom';

const ShoppingCartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartGoods = useAppSelector(selectCartGoods);
  const [form] = Form.useForm();
  const cartGoodsTotalPrice = useAppSelector(selectCartGoodsTotalPrice);

  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);

  const [triggerCreateOrder, result] = useCreateOrderMutation();

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  const onSubmitOrder = () => {
    const order: Order = { customer: form.getFieldsValue(), cartGoods };
    triggerCreateOrder(order);
  };

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(setCartGoodInitialState());
      dispatch(setGoodsInitialState());
      navigate('/');
      toast.success('Order successfully created!');
    }
  }, [result]);

  return (
    <PageLayout>
      <div className="shopping-cart-page">
        <div className="main-info">
          <div className="order-form">
            <Card className="form-card">
              <Form name="order-form" layout={'vertical'} form={form}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      type: 'string',
                      message: 'Please input your name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="E-mail"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Please input your e-mail!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      type: 'string',
                      message: 'Please input your phone!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      type: 'string',
                      message: 'Please input your address!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </Card>
          </div>
          <div className="order-details">
            <Card className="good-cart-list">
              <GoodCartList />
            </Card>
          </div>
        </div>
        <div className="total-info">
          <div>Total price: {cartGoodsTotalPrice}</div>
          <Button type="primary" disabled={!submittable || !cartGoods.length} onClick={onSubmitOrder}>
            Submit
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ShoppingCartPage;

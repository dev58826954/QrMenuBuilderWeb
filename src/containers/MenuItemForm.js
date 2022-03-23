import React, {useState, useContext, useRef} from 'react';
import {Button, Form, Popover, Overlay} from 'react-bootstrap';
import {RiPlayListAddFill} from 'react-icons/ri';
import {toast} from 'react-toastify';

import {addCategory, addMenuItems, updateMenuItem} from '../apis';
import AuthContext from '../contexts/AuthContext';
import ImageDropzone from './ImageDropzone';

const MenuItemForm = ({place, onDone, item = {}}) => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryFormShow, setCategoryFormShow] = useState(false);

    const [category, setCategory] = useState(item.category);
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price || 0);
    const [description, setDescription] = useState(item.description);
    const [image, setImage] = useState(item.image);
    const [isAvailable, setIsAvailable] = useState(
        item.is_available === undefined ? true : !!item.is_available
    );

    const target = useRef(null);

    const auth = useContext(AuthContext);

    const onAddCategory = async () => {
        const json = await addCategory({name: categoryName, place: place.id}, auth.token);
        console.log(json);

        if (json) {
            toast(`Une nouvelle catégorie ${json.name} a été créer.`, {type: "success"});
            setCategory(json.id);
            setCategoryName("");
            setCategoryFormShow(false);
            onDone();
        }
    };

    const onAddMenuItems = async () => {
        const json = await addMenuItems({
            place: place.id,
            category,
            name,
            price,
            description,
            image,
            is_available: isAvailable
        }, auth.token);

        console.log(json);

        if (json) {
            toast(`Article menu ${json.name} a été créer`, {type: "success"});
            setCategory("");
            setName("");
            setPrice(0);
            setDescription("");
            setImage("");
            setIsAvailable(true);
            onDone();
        }
    }

    const onUpdateMenuItem = async () => {
        const json = await updateMenuItem(
            item.id,
            {
                place: place.id,
                category,
                name,
                price,
                description,
                image,
                is_available: isAvailable
            },
            auth.token
        );

        if (json) {
            console.log(json);

            toast(`Article menu ${json.name} a été mis à jour`, {type: "success"});
            setCategory("");
            setName("");
            setPrice(0)
            setDescription("");
            setImage("");
            setIsAvailable(false);
            onDone();
        }
    }

    return (
        <div>
            {/* CATEGORIES FORM */}
            <Form.Group>
                <Form.Label>Catégorie</Form.Label>
                <div className="d-flex align-items-center">

                    <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option/>
                        {place?.categories?.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </Form.Control>

                    <Button ref={target} variant="link" onClick={() => setCategoryFormShow(true)}>
                        <RiPlayListAddFill size={25}/>
                    </Button>

                    <Overlay
                        show={categoryFormShow}
                        target={target.current}
                        placement="bottom"
                        rootClose
                        onHide={() => setCategoryFormShow(false)}
                    >
                        <Popover id="popover-contained">
                            <Popover.Title as="h3">Formulaire création catégorie</Popover.Title>
                            <Popover.Content>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nom de la catégorie"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="standard" block onClick={onAddCategory}>
                                    Enregistrer
                                </Button>
                            </Popover.Content>
                        </Popover>

                    </Overlay>


                </div>
            </Form.Group>

            {/* MENU ITEMS FORM */}
            <Form.Group>
                <Form.Label>Nom de l'article</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Entrer le nom de l'artcile"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Prix (F CFA)</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Description de l'article"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Image</Form.Label>
                <ImageDropzone value={image} onChange={setImage}/>
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    label="Est disponible?"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                />
            </Form.Group>
            <Button
                variant="standard"
                block
                onClick={item.id ? onUpdateMenuItem : onAddMenuItems}
            >
                {item.id ? "Modifier l'article du menu" : "+ Créer nouvel au article menu"}
            </Button>
        </div>

    );
}

export default MenuItemForm;
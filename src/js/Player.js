/**
 * Player class prototype
 *
 * @constructor new Player()
 */
function Player() {

    this.position= null; // Vector3
    this.mesh= null; // Three mesh
    this.direction= null;

    this.init = function () {
        var geometry = new THREE.IcosahedronGeometry(1, 0);
        var material = new THREE.MeshPhongMaterial({ ambient: 0xff0000, color: 0xff3300, specular: 0x0099ff, shininess: 30, shading: THREE.FlatShading });
        this.mesh = new THREE.Mesh(geometry, material);
        this.obj = new THREE.Object3D();

        var canonH = 2;
        var geo = new THREE.CylinderGeometry(0.15, 0.5, canonH);
        geo.applyMatrix(new THREE.Matrix4().makeTranslation(0, canonH / 2, 0));

        var mat = new THREE.MeshPhongMaterial({ ambient: 0xff0000, color: 0x00ffff, specular: 0x0099ff, shininess: 30, shading: THREE.FlatShading });
        this.canon = new THREE.Mesh(geo, mat);

        this.obj.add(this.mesh);
        this.obj.add(this.canon);
        this.canon.rotateX(45 * Math.PI / 180);
    };


    /**
     * set the position of the player
     * @param vector3
     */
    this.setPosition = function (vector3) {
        console.log("Player.setPosition", vector3);
        this.position = vector3;

        this.obj.translateX(vector3.x);
        this.obj.translateY(vector3.y);
        this.obj.translateZ(vector3.z);
    };


    /**
     * return the composed player object mesh
     *
     * @returns {THREE.Object3D|*|Player.obj}
     */
    this.getMesh = function () {
        return this.obj;
    };


    /**
     * fire a new projectile form the player's current position and rotation
     *
     * triggers PROJECTILE_FIRED event
     *
     * TODO power of shot
     */
    this.fire = function () {
        var projectile = new Projectile();
        console.log("Player.fire()", this.position);



        projectile.direction = new THREE.Vector3(0.5, 0.5, 0);
        projectile.mass = 0.011;
        projectile.setPosition(this.position);

        $(this).trigger("PROJECTILE_FIRED", projectile);
    };


    /**
     * manipulate the player's canon vertical angle
     * @param angleChange in radians
     */
    this.addAngle = function(angleChange) {
        console.log("Player.setAngle", angleChange, this.canon.rotation.x);
        // check the proposed change in angle for the canon is still within 90 deg up and 0 deg forward facing
        if (this.canon.rotation.x + angleChange > 0 && this.canon.rotation.x + angleChange < Math.PI / 2) {
            this.canon.rotateX(angleChange);
        }
    };


    /**
     * rotates the player canon horizontally
     * @param rotationChange in radians
     */
    this.addRotation = function(rotationChange) {
        console.log("Player.setRotation", this.obj, this.obj.rotation, this.obj.quaternion);
        // rotate the whole player object, not just the canon
        this.obj.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotationChange);
    };

}


/**
 * Player subclass with input interaction for aiming and firing
 *
 * @constructor new HumanPlayer()
 */
function HumanPlayer() {

    var that = this;
    this.controlsEnabled = false;
    this.enableControls = function () {
        this.controlsEnabled = true;
    }
    this.disableControls = function () {
        this.controlsEnabled = false;
    };

    Player.call(this);

    setupControls();


    function setupControls () {
        console.log("HumanPlayer.setupControls()");
        $(window).on("keydown", onKeyUp);
    }


    /**
     * TODO improve rotating by adding additive rotation speed when key pressed continuously
     */
    function onKeyUp(e) {
        if (!that.controlsEnabled) {
            return false;
        }
        console.log(e.keyCode);

        var rotationStep = 2;

        switch (e.keyCode) {
            // arrow up
            case 38:
                that.addAngle(rotationStep * (Math.PI / 180));
                break;

            // arrow down
            case 40:
                that.addAngle(-rotationStep * (Math.PI / 180));
                break;

            // arrow left
            case 37:
                that.addRotation(-rotationStep * (Math.PI / 180));
                break;

            // arrow right
            case 39:
                that.addRotation(rotationStep * (Math.PI / 180));
                break;

            // space bar
            case 32:
                that.fire();
                break;

            default:
                break;
        }
    }
}

HumanPlayer.prototype = new Player();
HumanPlayer.constructor = HumanPlayer;